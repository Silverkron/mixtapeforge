//! Bundled cover typography. No operating-system font lookup or network access.
use std::{collections::BTreeMap, sync::OnceLock};
use ttf_parser::{Face, OutlineBuilder};

pub const FONTS: [(&str, &str, &[u8]); 6] = [
    (
        "sans",
        "Cassette Barlow",
        include_bytes!("../../public/fonts/barlow/Barlow-Medium.ttf"),
    ),
    (
        "bold",
        "Cassette Barlow Bold",
        include_bytes!("../../public/fonts/barlow/Barlow-Bold.ttf"),
    ),
    (
        "display",
        "Cassette Barlow Condensed",
        include_bytes!("../../public/fonts/barlowcondensed/BarlowCondensed-Bold.ttf"),
    ),
    (
        "mono",
        "Cassette Plex Mono",
        include_bytes!("../../public/fonts/ibmplexmono/IBMPlexMono-Medium.ttf"),
    ),
    (
        "poster",
        "Cassette Bebas Neue",
        include_bytes!("../../public/fonts/bebasneue/BebasNeue-Regular.ttf"),
    ),
    (
        "typewriter",
        "Cassette Courier Prime",
        include_bytes!("../../public/fonts/courierprime/CourierPrime-Regular.ttf"),
    ),
];

fn index(role: &str) -> usize {
    FONTS.iter().position(|f| f.0 == role).unwrap_or(0)
}
pub fn family(role: &str) -> &'static str {
    FONTS[index(role)].1
}
pub fn face(role: &str) -> &'static Face<'static> {
    static FACES: OnceLock<Vec<Face<'static>>> = OnceLock::new();
    &FACES.get_or_init(|| {
        FONTS
            .iter()
            .map(|f| Face::parse(f.2, 0).expect("valid bundled font"))
            .collect()
    })[index(role)]
}
pub fn width(text: &str, size: f64, role: &str) -> f64 {
    let face = face(role);
    text.chars()
        .map(|c| {
            let glyph = face
                .glyph_index(c)
                .or_else(|| face.glyph_index('?'))
                .unwrap();
            f64::from(face.glyph_hor_advance(glyph).unwrap_or(0))
        })
        .sum::<f64>()
        * size
        / f64::from(face.units_per_em())
}
/// Generated frontend metrics come from these exact font files.
pub fn metrics() -> serde_json::Value {
    let mut fonts = BTreeMap::new();
    for (role, _, _) in FONTS {
        let face = face(role);
        let mut advances = BTreeMap::new();
        for table in face.tables().cmap.unwrap().subtables {
            if table.is_unicode() {
                table.codepoints(|code| {
                    if let Some(c) = char::from_u32(code) {
                        if let Some(glyph) = face.glyph_index(c) {
                            advances
                                .insert(c.to_string(), face.glyph_hor_advance(glyph).unwrap_or(0));
                        }
                    }
                });
            }
        }
        fonts.insert(
            role,
            serde_json::json!({"units":face.units_per_em(),"advances":advances}),
        );
    }
    serde_json::to_value(fonts).unwrap()
}

pub fn svg_styles() -> &'static str {
    use base64::{engine::general_purpose::STANDARD, Engine};
    static CSS: OnceLock<String> = OnceLock::new();
    CSS.get_or_init(|| {
        let licenses = [
            include_str!("../../public/fonts/barlow/OFL.txt"),
            include_str!("../../public/fonts/barlowcondensed/OFL.txt"),
            include_str!("../../public/fonts/ibmplexmono/OFL.txt"),
            include_str!("../../public/fonts/bebasneue/OFL.txt"),
            include_str!("../../public/fonts/courierprime/OFL.txt"),
        ].join("\n\n").replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;");
        let mut css = format!("<metadata>{licenses}</metadata><defs><style>");
        for (_, name, data) in FONTS {
            css.push_str(&format!("@font-face{{font-family:'{name}';src:url(data:font/ttf;base64,{}) format('truetype');font-weight:400;font-style:normal}}", STANDARD.encode(data)));
        }
        css.push_str("text{font-kerning:none;font-variant-ligatures:none}</style></defs>");
        css
    })
}

#[derive(Default)]
struct PdfOutline {
    path: String,
    position: (f32, f32),
}
impl OutlineBuilder for PdfOutline {
    fn move_to(&mut self, x: f32, y: f32) {
        self.path.push_str(&format!("{x} {y} m\n"));
        self.position = (x, y);
    }
    fn line_to(&mut self, x: f32, y: f32) {
        self.path.push_str(&format!("{x} {y} l\n"));
        self.position = (x, y);
    }
    fn quad_to(&mut self, x1: f32, y1: f32, x: f32, y: f32) {
        let (px, py) = self.position;
        let a = (px + 2. * (x1 - px) / 3., py + 2. * (y1 - py) / 3.);
        let b = (x + 2. * (x1 - x) / 3., y + 2. * (y1 - y) / 3.);
        self.curve_to(a.0, a.1, b.0, b.1, x, y);
    }
    fn curve_to(&mut self, x1: f32, y1: f32, x2: f32, y2: f32, x: f32, y: f32) {
        self.path
            .push_str(&format!("{x1} {y1} {x2} {y2} {x} {y} c\n"));
        self.position = (x, y);
    }
    fn close(&mut self) {
        self.path.push_str("h\n");
    }
}

/// Outlines preserve the chosen font and accents without PDF font substitution.
/// Input coordinates use millimetres and the scene's downward Y axis.
pub fn pdf_text(text: &str, role: &str, size: f64, x: f64, y: f64, rotate: f64) -> String {
    let face = face(role);
    let scale = size / f64::from(face.units_per_em());
    let mut out = format!("q 1 0 0 1 {x} {y} cm\n");
    if rotate == 90. {
        out.push_str("0 1 -1 0 0 0 cm\n");
    }
    out.push_str(&format!("{scale} 0 0 {} 0 0 cm\n", -scale));
    for c in text.chars() {
        let glyph = face
            .glyph_index(c)
            .or_else(|| face.glyph_index('?'))
            .unwrap();
        let mut path = PdfOutline::default();
        if face.outline_glyph(glyph, &mut path).is_some() {
            out.push_str(&path.path);
            out.push_str("f\n");
        }
        let advance = face.glyph_hor_advance(glyph).unwrap_or(0);
        out.push_str(&format!("1 0 0 1 {advance} 0 cm\n"));
    }
    out.push_str("Q\n");
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn frontend_metrics_match_the_bundled_font_files() {
        let frontend: serde_json::Value =
            serde_json::from_str(include_str!("../../src/artwork/font-metrics.json")).unwrap();
        assert_eq!(metrics(), frontend);
    }

    #[test]
    fn all_cover_fonts_preserve_italian_accents_and_punctuation() {
        for (role, _, _) in FONTS {
            let font = face(role);
            for c in "È già l’ora: città, perché, più, così – 01. ¡Mañana! ¿Canción? Noël, cœur, français, été.".chars() {
                assert!(font.glyph_index(c).is_some(), "{role} missing {c}");
            }
            assert_ne!(
                pdf_text("é", role, 3., 3., 23., 0.),
                pdf_text("e", role, 3., 3., 23., 0.)
            );
        }
    }
}

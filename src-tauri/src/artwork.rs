use crate::model::Project;
fn esc(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
}
pub fn tracklist(p: &Project) -> String {
    let mut s = format!("{}\n{}\n\n", p.title, p.subtitle);
    if p.processing.nr == "type_b" {
        s.push_str(&format!(
            "NR: Type B (libdolbyb 1.1) · riferimento {} dBFS peak\nRiproduzione: Dolby B\n\n",
            p.processing.nr_reference
        ));
    }
    for side in 0..2 {
        s.push_str(&format!("LATO {}\n", if side == 0 { "A" } else { "B" }));
        for (i, id) in p.sides[side].iter().enumerate() {
            if let Some(t) = p.track(id) {
                s.push_str(&format!(
                    "{:02}. {} — {} [{:02}:{:02}]\n",
                    i + 1,
                    t.artist,
                    t.title,
                    t.length() as u64 / 60,
                    t.length() as u64 % 60
                ));
            }
        }
        s.push('\n');
    }
    s
}

use serde::{Deserialize, Serialize};
use std::{collections::HashMap, sync::OnceLock};

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(default)]
pub struct ArtworkSettings {
    pub style: String,
    pub paper: String,
    pub ink: String,
    pub accent: String,
    pub secondary: String,
    pub monochrome: bool,
    pub font: String,
}
impl Default for ArtworkSettings {
    fn default() -> Self {
        Self {
            style: "classic".into(),
            paper: "#f5f3fa".into(),
            ink: "#171329".into(),
            accent: "#c4adff".into(),
            secondary: "#54bdc8".into(),
            monochrome: false,
            font: String::new(),
        }
    }
}
fn hex_color(s: &str) -> bool {
    s.len() == 7 && s.starts_with('#') && s[1..].bytes().all(|b| b.is_ascii_hexdigit())
}
impl ArtworkSettings {
    pub fn validate(&self) -> Result<(), String> {
        if !self.font.is_empty() && !crate::artwork_fonts::FONTS.iter().any(|f| f.0 == self.font) {
            return Err("Font copertina non disponibile".into());
        }
        if !catalog().styles.iter().any(|s| s.id == self.style) {
            return Err("Stile copertina non disponibile".into());
        }
        if [&self.paper, &self.ink, &self.accent, &self.secondary]
            .iter()
            .any(|c| !hex_color(c))
        {
            return Err("I colori della copertina devono essere nel formato #RRGGBB".into());
        }
        Ok(())
    }
}
#[derive(Clone, Debug, Deserialize)]
pub struct Palette {
    pub name: String,
    pub paper: String,
    pub ink: String,
    pub accent: String,
    pub secondary: String,
}
#[derive(Clone, Debug, Deserialize)]
pub struct Style {
    pub id: String,
    pub name: String,
    pub family: String,
    pub description: String,
    pub font: String,
    pub header: String,
    pub monochrome: bool,
    pub palettes: Vec<Palette>,
    pub decor: Vec<Node>,
}
#[derive(Debug, Deserialize)]
pub struct Geometry {
    pub width: f64,
    pub height: f64,
    pub front: f64,
    pub spine: f64,
}
#[derive(Debug, Deserialize)]
pub struct Catalog {
    pub geometry: Geometry,
    pub styles: Vec<Style>,
}
pub fn catalog() -> &'static Catalog {
    static CATALOG: OnceLock<Catalog> = OnceLock::new();
    CATALOG.get_or_init(|| {
        serde_json::from_str(include_str!("../../src/artwork/catalog.json"))
            .expect("valid bundled artwork catalog")
    })
}
fn default_width() -> f64 {
    0.2
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "lowercase")]
pub enum Node {
    Rect {
        x: f64,
        y: f64,
        w: f64,
        h: f64,
        fill: String,
        #[serde(default)]
        stroke: Option<String>,
        #[serde(default = "default_width")]
        width: f64,
    },
    Line {
        x1: f64,
        y1: f64,
        x2: f64,
        y2: f64,
        stroke: String,
        width: f64,
        #[serde(default)]
        dash: bool,
    },
    Circle {
        cx: f64,
        cy: f64,
        r: f64,
        fill: String,
        #[serde(default)]
        stroke: Option<String>,
        #[serde(default = "default_width")]
        width: f64,
    },
    Polygon {
        points: Vec<[f64; 2]>,
        fill: String,
    },
    Text {
        x: f64,
        y: f64,
        size: f64,
        font: String,
        fill: String,
        text: String,
        #[serde(default)]
        rotate: f64,
    },
}
fn rgb(hex: &str) -> [f64; 3] {
    [1, 3, 5].map(|i| u8::from_str_radix(&hex[i..i + 2], 16).unwrap_or(0) as f64 / 255.)
}
fn luminance(hex: &str) -> f64 {
    rgb(hex)
        .iter()
        .zip([0.2126, 0.7152, 0.0722])
        .map(|(v, w)| {
            if *v <= 0.04045 {
                v / 12.92 * w
            } else {
                ((v + 0.055) / 1.055).powf(2.4) * w
            }
        })
        .sum()
}
fn contrast(a: &str, b: &str) -> f64 {
    let (x, y) = (luminance(a), luminance(b));
    (x.max(y) + 0.05) / (x.min(y) + 0.05)
}
fn palette(settings: &ArtworkSettings) -> HashMap<String, String> {
    let mut colors: HashMap<String, String> = [
        ("paper", &settings.paper),
        ("ink", &settings.ink),
        ("accent", &settings.accent),
        ("secondary", &settings.secondary),
    ]
    .into_iter()
    .map(|(k, v)| {
        let value = if settings.monochrome {
            let c = rgb(v);
            let g = ((c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722) * 255.).round() as u8;
            format!("#{g:02x}{g:02x}{g:02x}")
        } else {
            v.clone()
        };
        (k.into(), value)
    })
    .collect();
    let ink = if contrast(&colors["accent"], "#000000") >= contrast(&colors["accent"], "#ffffff") {
        "#000000"
    } else {
        "#ffffff"
    };
    colors.insert("on_accent".into(), ink.into());
    colors
}
fn text_width(text: &str, size: f64, font: &str) -> f64 {
    crate::artwork_fonts::width(text, size, font)
}
fn fit_line(text: &str, width: f64, size: f64, font: &str) -> String {
    if text_width(text, size, font) <= width {
        return text.into();
    }
    let mut out = String::new();
    for c in text.chars() {
        if text_width(&format!("{out}{c}..."), size, font) > width {
            break;
        }
        out.push(c);
    }
    format!("{}...", out.trim_end())
}
fn title_lines(title: &str, font: &str) -> Vec<String> {
    let words: Vec<_> = title.split_whitespace().collect();
    let mut lines = vec![];
    let mut line = String::new();
    for (i, word) in words.iter().enumerate() {
        let next = if line.is_empty() {
            word.to_string()
        } else {
            format!("{line} {word}")
        };
        if text_width(&next, 4.2, font) > 59. && !line.is_empty() {
            lines.push(line);
            line = word.to_string();
            if lines.len() == 1 {
                lines.push(fit_line(&words[i..].join(" "), 59., 4.2, font));
                return lines;
            }
        } else {
            line = next;
        }
    }
    if !line.is_empty() {
        lines.push(fit_line(&line, 59., 4.2, font));
    }
    lines
}
struct Drawing {
    nodes: Vec<Node>,
    colors: HashMap<String, String>,
}
impl Drawing {
    fn color(&self, role: &str) -> String {
        self.colors
            .get(role)
            .cloned()
            .unwrap_or_else(|| role.into())
    }
    fn rect(&mut self, x: f64, y: f64, w: f64, h: f64, fill: &str, stroke: Option<&str>) {
        self.nodes.push(Node::Rect {
            x,
            y,
            w,
            h,
            fill: self.color(fill),
            stroke: stroke.map(|s| self.color(s)),
            width: 0.15,
        });
    }
    fn text(
        &mut self,
        position: [f64; 2],
        size: f64,
        font: &str,
        fill: &str,
        text: String,
        rotate: f64,
    ) {
        self.nodes.push(Node::Text {
            x: position[0],
            y: position[1],
            size,
            font: font.into(),
            fill: self.color(fill),
            text,
            rotate,
        });
    }
    fn decor(&mut self, node: &Node) {
        let mut node = node.clone();
        match &mut node {
            Node::Rect { fill, stroke, .. } | Node::Circle { fill, stroke, .. } => {
                *fill = self.color(fill);
                *stroke = stroke.as_ref().map(|s| self.color(s));
            }
            Node::Line { stroke, .. } => *stroke = self.color(stroke),
            Node::Polygon { fill, .. } | Node::Text { fill, .. } => *fill = self.color(fill),
        }
        self.nodes.push(node);
    }
}
pub fn scene(p: &Project) -> Vec<Node> {
    let settings = p.artwork.clone().unwrap_or_else(|| ArtworkSettings {
        accent: if hex_color(&p.color) {
            p.color.clone()
        } else {
            "#c4adff".into()
        },
        ..Default::default()
    });
    let cat = catalog();
    let style = cat
        .styles
        .iter()
        .find(|s| s.id == settings.style)
        .unwrap_or(&cat.styles[0]);
    let g = &cat.geometry;
    let mut d = Drawing {
        nodes: vec![],
        colors: palette(&settings),
    };
    d.rect(0., 0., g.width, g.height, "paper", None);
    for node in &style.decor {
        d.decor(node);
    }
    d.rect(g.front, 0., g.spine, g.height, "accent", None);
    d.rect(77.8, 74., 27., 27.6, "paper", None);
    let header = if style.header == "accent" {
        "on_accent"
    } else {
        "ink"
    };
    d.text(
        [3., 4.5],
        1.8,
        "mono",
        header,
        "MIXTAPEFORGE / STEREO".into(),
        0.,
    );
    let title = if p.title.trim().is_empty() {
        "La mia mixtape"
    } else {
        p.title.trim()
    };
    let title_font = if settings.font.is_empty() {
        &style.font
    } else {
        &settings.font
    };
    for (i, line) in title_lines(title, title_font).into_iter().enumerate() {
        d.text(
            [3., 11. + i as f64 * 5.2],
            4.2,
            title_font,
            header,
            line,
            0.,
        );
    }
    d.text(
        [3., 23.],
        3.,
        "sans",
        header,
        fit_line(&p.subtitle, 59., 3., "sans"),
        0.,
    );
    let mut y = 31.;
    for side in 0..2 {
        d.text(
            [3., y],
            3.,
            "bold",
            "ink",
            crate::locale::format("LATO {0}", &[if side == 0 { "A" } else { "B" }]),
            0.,
        );
        y += 4.2;
        if p.sides[side].is_empty() {
            d.text(
                [3., y],
                2.9,
                "sans",
                "ink",
                crate::locale::text("Nessun brano"),
                0.,
            );
            y += 3.7;
        }
        for (i, id) in p.sides[side].iter().enumerate() {
            if let Some(t) = p.track(id) {
                d.text(
                    [3., y],
                    2.9,
                    "sans",
                    "ink",
                    fit_line(&format!("{:02}. {}", i + 1, t.title), 59., 2.9, "sans"),
                    0.,
                );
                y += 3.7;
            }
        }
        y += 2.;
    }
    d.text(
        [72.7, 4.],
        3.,
        "bold",
        "on_accent",
        fit_line(&p.title, 92., 3., "bold"),
        90.,
    );
    d.text(
        [81., 8.],
        4.,
        "bold",
        "ink",
        fit_line(&p.tape, 20., 4., "bold"),
        0.,
    );
    d.text([81., 13.], 1.8, "mono", "ink", "STEREO".into(), 0.);
    d.text(
        [81., 80.],
        2.,
        "mono",
        "ink",
        crate::locale::format("LATO A / {0} BRANI", &[&p.sides[0].len().to_string()]),
        0.,
    );
    d.text(
        [81., 85.],
        2.,
        "mono",
        "ink",
        crate::locale::format("LATO B / {0} BRANI", &[&p.sides[1].len().to_string()]),
        0.,
    );
    if p.processing.nr == "type_b" {
        d.text([81., 94.], 1.8, "bold", "ink", "NR TYPE B".into(), 0.);
        d.text(
            [81., 98.],
            1.5,
            "sans",
            "ink",
            "PLAYBACK: DOLBY B".into(),
            0.,
        );
    }
    d.rect(0., 0., g.width, g.height, "none", Some("ink"));
    for x in [g.front, g.front + g.spine] {
        d.nodes.push(Node::Line {
            x1: x,
            y1: 0.,
            x2: x,
            y2: g.height,
            stroke: d.color("ink"),
            width: 0.15,
            dash: true,
        });
    }
    d.nodes
}
pub fn svg(p: &Project) -> String {
    let mut out = String::from(
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="124.8mm" height="141.6mm" viewBox="0 0 124.8 141.6"><rect width="124.8" height="141.6" fill="white"/>"#,
    );
    out.push_str(crate::artwork_fonts::svg_styles());
    out.push_str(r#"<g transform="translate(10 10)">"#);
    for node in scene(p) {
        let element = match node {
            Node::Rect {
                x,
                y,
                w,
                h,
                fill,
                stroke,
                width,
            } => format!(
                r#"<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{}" stroke-width="{width}"/>"#,
                stroke.unwrap_or_else(|| "none".into())
            ),
            Node::Line {
                x1,
                y1,
                x2,
                y2,
                stroke,
                width,
                dash,
            } => format!(
                r#"<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{width}" stroke-dasharray="{}"/>"#,
                if dash { "1 1" } else { "none" }
            ),
            Node::Circle {
                cx,
                cy,
                r,
                fill,
                stroke,
                width,
            } => format!(
                r#"<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{}" stroke-width="{width}"/>"#,
                stroke.unwrap_or_else(|| "none".into())
            ),
            Node::Polygon { points, fill } => format!(
                r#"<polygon points="{}" fill="{fill}"/>"#,
                points
                    .iter()
                    .map(|p| format!("{},{}", p[0], p[1]))
                    .collect::<Vec<_>>()
                    .join(" ")
            ),
            Node::Text {
                x,
                y,
                size,
                font,
                fill,
                text,
                rotate,
            } => format!(
                r#"<text x="{x}" y="{y}" font-size="{size}" font-family="{}" font-weight="{}" fill="{fill}" transform="rotate({rotate} {x} {y})">{}</text>"#,
                crate::artwork_fonts::family(&font),
                400,
                esc(&text)
            ),
        };
        out.push_str(&element);
    }
    out.push_str(r##"</g><path d="M10 125h50m-50 -1v2m50 -2v2" stroke="#333" stroke-width="0.2"/><text x="10" y="131" font-family="Arial" font-size="2.5">50 mm - Stampa al 100% - Linee tratteggiate: piega</text></svg>"##);
    out
}
fn pdf_color(color: &str, stroke: bool) -> String {
    let c = rgb(color);
    format!(
        "{:0.6} {:0.6} {:0.6} {}\n",
        c[0],
        c[1],
        c[2],
        if stroke { "RG" } else { "rg" }
    )
}
pub fn pdf(p: &Project) -> Vec<u8> {
    let mm = 72. / 25.4;
    let mut content = format!(
        "q {mm} 0 0 -{mm} {} {} cm 0 0 104.8 101.6 re W n\n",
        20. * mm,
        277. * mm
    );
    for node in scene(p) {
        match node {
            Node::Rect {
                x,
                y,
                w,
                h,
                fill,
                stroke,
                width,
            } => {
                if fill != "none" {
                    content.push_str(&pdf_color(&fill, false));
                }
                if let Some(ref s) = stroke {
                    content.push_str(&pdf_color(s, true));
                }
                content.push_str(&format!(
                    "{width} w {x} {y} {w} {h} re {}\n",
                    if fill == "none" {
                        "S"
                    } else if stroke.is_some() {
                        "B"
                    } else {
                        "f"
                    }
                ));
            }
            Node::Line {
                x1,
                y1,
                x2,
                y2,
                stroke,
                width,
                dash,
            } => {
                content.push_str(&pdf_color(&stroke, true));
                content.push_str(&format!(
                    "{width} w {} 0 d {x1} {y1} m {x2} {y2} l S [] 0 d\n",
                    if dash { "[1 1]" } else { "[]" }
                ));
            }
            Node::Polygon { points, fill } => {
                content.push_str(&pdf_color(&fill, false));
                for (i, p) in points.iter().enumerate() {
                    content.push_str(&format!(
                        "{} {} {} ",
                        p[0],
                        p[1],
                        if i == 0 { "m" } else { "l" }
                    ));
                }
                content.push_str("h f\n");
            }
            Node::Circle {
                cx,
                cy,
                r,
                fill,
                stroke,
                width,
            } => {
                let k = r * 0.5522847498;
                if fill != "none" {
                    content.push_str(&pdf_color(&fill, false));
                }
                if let Some(ref s) = stroke {
                    content.push_str(&pdf_color(s, true));
                }
                content.push_str(&format!("{width} w {} {cy} m {} {} {} {} {cx} {} c {} {} {} {} {} {cy} c {} {} {} {} {cx} {} c {} {} {} {} {} {cy} c {}\n",cx+r,cx+r,cy+k,cx+k,cy+r,cy+r,cx-k,cy+r,cx-r,cy+k,cx-r,cx-r,cy-k,cx-k,cy-r,cy-r,cx+k,cy-r,cx+r,cy-k,cx+r,if fill=="none"{"S"}else if stroke.is_some(){"B"}else{"f"}));
            }
            Node::Text {
                x,
                y,
                size,
                font,
                fill,
                text,
                rotate,
            } => {
                content.push_str(&pdf_color(&fill, false));
                content.push_str(&crate::artwork_fonts::pdf_text(
                    &text, &font, size, x, y, rotate,
                ));
            }
        }
    }
    content.push_str(&format!("Q\n0 0 0 RG {} 100 m {} 100 l S BT /F1 8 Tf {} 86 Td (50 mm - Print at 100% / Actual size) Tj ET",20.*mm,70.*mm,20.*mm));
    let objects:Vec<String>=vec!["<< /Type /Catalog /Pages 2 0 R >>".into(),"<< /Type /Pages /Kids [3 0 R] /Count 1 >>".into(),"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.276 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>".into(),"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>".into(),"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>".into(),"<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>".into(),format!("<< /Length {} >>\nstream\n{}\nendstream",content.len(),content)];
    let mut out = b"%PDF-1.4\n".to_vec();
    let mut offsets = vec![0];
    for (i, o) in objects.iter().enumerate() {
        offsets.push(out.len());
        out.extend_from_slice(format!("{} 0 obj\n{}\nendobj\n", i + 1, o).as_bytes());
    }
    let start = out.len();
    out.extend_from_slice(
        format!("xref\n0 {}\n0000000000 65535 f \n", objects.len() + 1).as_bytes(),
    );
    for offset in offsets.iter().skip(1) {
        out.extend_from_slice(format!("{offset:010} 00000 n \n").as_bytes());
    }
    out.extend_from_slice(
        format!(
            "trailer\n<< /Size {} /Root 1 0 R >>\nstartxref\n{start}\n%%EOF",
            objects.len() + 1
        )
        .as_bytes(),
    );
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn older_projects_keep_their_original_label_color() {
        let mut value = serde_json::to_value(Project::default()).unwrap();
        value.as_object_mut().unwrap().remove("artwork");
        value["color"] = serde_json::json!("#123456");
        let project: Project = serde_json::from_value(value).unwrap();
        assert!(project.artwork.is_none());
        assert!(svg(&project).contains("#123456"));
    }
    #[test]
    fn every_style_and_palette_is_valid_and_roundtrips() {
        for style in &catalog().styles {
            for palette in &style.palettes {
                let project = Project {
                    artwork: Some(ArtworkSettings {
                        style: style.id.clone(),
                        paper: palette.paper.clone(),
                        ink: palette.ink.clone(),
                        accent: palette.accent.clone(),
                        secondary: palette.secondary.clone(),
                        monochrome: style.monochrome,
                        font: String::new(),
                    }),
                    ..Default::default()
                };
                project.validate().unwrap();
                let restored: Project =
                    serde_json::from_slice(&serde_json::to_vec(&project).unwrap()).unwrap();
                assert_eq!(
                    serde_json::to_value(scene(&project)).unwrap(),
                    serde_json::to_value(scene(&restored)).unwrap()
                );
                assert!(pdf(&project).starts_with(b"%PDF-1.4"));
            }
        }
    }
    #[test]
    fn grayscale_custom_colors_are_applied_to_export_primitives() {
        let project = Project {
            artwork: Some(ArtworkSettings {
                style: "synthwave".into(),
                accent: "#ff2178".into(),
                monochrome: true,
                ..Default::default()
            }),
            ..Default::default()
        };
        for node in scene(&project) {
            let colors: Vec<_> = match node {
                Node::Rect { fill, stroke, .. } | Node::Circle { fill, stroke, .. } => {
                    vec![Some(fill), stroke]
                }
                Node::Line { stroke, .. } => vec![Some(stroke)],
                Node::Polygon { fill, .. } | Node::Text { fill, .. } => vec![Some(fill)],
            };
            for color in colors.into_iter().flatten().filter(|c| c != "none") {
                let c = rgb(&color);
                assert_eq!(c[0], c[1]);
                assert_eq!(c[1], c[2]);
            }
        }
    }
    #[test]
    fn rejects_unknown_styles_and_invalid_color_values() {
        let mut settings = ArtworkSettings {
            style: "unknown".into(),
            ..Default::default()
        };
        assert!(settings.validate().is_err());
        settings.style = "classic".into();
        settings.paper = "red\" onload=\"alert(1)".into();
        assert!(settings.validate().is_err());
    }

    #[test]
    fn fifteen_tracks_and_long_titles_fit_every_front_panel() {
        let mut project: Project =
            serde_json::from_str(include_str!("../../src/artwork/fixture-project.json")).unwrap();
        for i in 12..15 {
            let mut track = project.tracks[0].clone();
            track.id = format!("extra-{i}");
            track.title = "W".repeat(160);
            project.sides[i % 2].push(track.id.clone());
            project.tracks.push(track);
        }
        project.title =
            "A very long title with WIDE words and a second part that cannot fit on one line"
                .into();
        for style in &catalog().styles {
            project.artwork = Some(ArtworkSettings {
                style: style.id.clone(),
                ..Default::default()
            });
            project.validate().unwrap();
            for node in scene(&project) {
                if let Node::Text {
                    x,
                    y,
                    size,
                    font,
                    text,
                    rotate,
                    ..
                } = node
                {
                    assert!(y <= 101.6);
                    if x == 3. && rotate == 0. {
                        assert!(text_width(&text, size, &font) <= 59.00001);
                    }
                }
            }
        }
    }
}

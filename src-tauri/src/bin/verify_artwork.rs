//! Generates all print styles and scene fixtures without audio or UI interaction.
use cassette_core::{
    artwork::{self, ArtworkSettings, Node},
    model::Project,
};
use std::path::PathBuf;
fn main() -> Result<(), String> {
    if std::env::args().nth(1).as_deref() == Some("--font-metrics") {
        std::fs::write(
            "src/artwork/font-metrics.json",
            serde_json::to_vec_pretty(&cassette_core::artwork_fonts::metrics()).unwrap(),
        )
        .map_err(|e| e.to_string())?;
        println!("Bundled font metrics regenerated.");
        return Ok(());
    }
    let dir = std::env::args()
        .nth(1)
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("test-results/artwork"));
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let mut project: Project =
        serde_json::from_str(include_str!("../../../src/artwork/fixture-project.json"))
            .map_err(|e| e.to_string())?;
    let mut fixtures = vec![];
    for style in &artwork::catalog().styles {
        let p = &style.palettes[0];
        project.artwork = Some(ArtworkSettings {
            style: style.id.clone(),
            paper: p.paper.clone(),
            ink: p.ink.clone(),
            accent: p.accent.clone(),
            secondary: p.secondary.clone(),
            monochrome: style.monochrome,
            font: String::new(),
        });
        project.validate()?;
        std::fs::write(
            dir.join(format!("{}.svg", style.id)),
            artwork::svg(&project),
        )
        .map_err(|e| e.to_string())?;
        std::fs::write(
            dir.join(format!("{}.pdf", style.id)),
            artwork::pdf(&project),
        )
        .map_err(|e| e.to_string())?;
        let scene = artwork::scene(&project);
        for node in &scene {
            if let Node::Text { y, rotate, .. } = node {
                assert!(*rotate == 90. || *y <= 101.6, "text out of bounds");
            }
        }
        fixtures.push(serde_json::json!({"style":style.id,"project":project,"scene":scene}));
    }
    for style in &artwork::catalog().styles {
        for (font, _, _) in cassette_core::artwork_fonts::FONTS {
            project.artwork = Some(ArtworkSettings {
                style: style.id.clone(),
                font: font.into(),
                ..Default::default()
            });
            project.title = "Été magnétique · Cañón / Fréquences très longues".into();
            project.subtitle = "Música · Rock · Synthwave".into();
            project.validate()?;
            std::fs::write(
                dir.join(format!("font-{}-{font}.pdf", style.id)),
                artwork::pdf(&project),
            )
            .map_err(|e| e.to_string())?;
            for node in artwork::scene(&project) {
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
                    assert!(rotate == 90. || y <= 101.6);
                    if x == 3. && y < 22. {
                        assert!(cassette_core::artwork_fonts::width(&text, size, &font) <= 59.0001)
                    }
                }
            }
        }
    }
    std::fs::write(
        dir.join("scenes.json"),
        serde_json::to_vec_pretty(&fixtures).map_err(|e| e.to_string())?,
    )
    .map_err(|e| e.to_string())?;
    println!(
        "PASS: {} styles, project validation, SVG/PDF and scene fixtures.",
        fixtures.len()
    );
    Ok(())
}

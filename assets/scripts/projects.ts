import type { Project } from "assets/scripts/types";

const projects: Project[] = [
    {
        name: "zitatsuchmaschine",
        title: "Zitatsuchmaschine",
        year: 2024,
        context: "SHK (HU zu Berlin)",
        type: "Webseite",
        about:
            "Die Zitatsuchmaschine wurde am Lehrstuhl für Maschinelles Lernen der Humboldt-Universität zu Berlin "
            + "entwickelt. Ich war allein verantwortlich für die Neugestaltung und Implementierung der Webseite. Die "
            + "Extraktion und Verarbeitung der Zitate sowie die Pflege der Datenbank wurden von meinen Kollegen "
            + "übernommen.",
        links: [
            {
                text: "Besuchen",
                url: "https://zitatsuchmaschine.informatik.hu-berlin.de/",
            },
        ],
    },
    {
        name: "oslo",
        title: "Oslo",
        year: 2020,
        context: "Hobbyprojekt",
        type: "Desktop-App",
        about:
            "Oslo ist eine Electron-App für die persönliche Finanzverwaltung. "
            + "Ursprünglich habe ich dieses Programm in Python geschrieben, "
            + "später allerdings dann neu als Electron-App aufgesetzt und "
            + "dann nochmals später mit Electron und React implementiert.",
        links: [
            {
                text: "GitHub",
                url: "https://github.com/konstantin-lukas/oslo",
            },
        ],
    },
    {
        name: "anzol",
        title: "Anzol",
        year: 2024,
        context: "Hobbyprojekt",
        type: "Library",
        about:
            "Anzol ist eine Library für React, die Hooks bereitstellt, mit denen man kürzeren und verständlicheren"
            + "Code schreiben kann. Das GitHub-Repository beinhaltet CI/CD für GitHub-Releases, Releases auf NPM und "
            + "GitHub Pages für die Dokumentation.",
        links: [
            {
                text: "GitHub",
                url: "https://github.com/konstantin-lukas/anzol",
            },
        ],
    },
    {
        name: "nox",
        title: "Nox",
        year: 2020,
        context: "Ausbildung",
        type: "Webseite",
        about:
            "Nox ist eine junge Metal-Band aus Berlin. "
            + "Ich habe ihr Logo gestaltet und ihren Webauftritt implementiert. "
            + "Das Ganze ist durch eine MySQL-Datenbank gestützt, die es der Band möglich macht, "
            + "die Seite über das von mir geschriebene CMS stets aktuell zu halten.",
        links: [
            {
                text: "Besuchen",
                url: "https://nox-band.com/",
            },
        ],
    },
    {
        name: "currency-input",
        title: "Currency Input",
        year: 2021,
        context: "Hobbyprojekt",
        type: "Library",
        about:
            "Hierbei handelt es sich um eine in TypeScript geschriebene Library, "
            + "die sich an einen normalen Text-Input hängt und diesen so manipuliert, "
            + "dass immer ein korrekt formattierter Währungsstring angezeigt wird.",
        links: [
            {
                text: "GitHub",
                url: "https://github.com/konstantin-lukas/intl-currency-input",
            },
        ],
    },
    {
        name: "untitled-ghost-game",
        title: "Untitled Ghost Game",
        year: 2023,
        context: "Freizeit & Uni",
        type: "Videospiel",
        about:
            "Das hier ist ein kleines Spiel in dem man Geister mit seiner Taschenlampe bekämpft. "
            + "Wobei das Wort \"klein\" nicht ganz zutrifft, denn das Spiel ist ohne ein richtiges "
            + "Framework nur mit der SDL-Library entwickelt und der Source-Code ist ziemlich umfangreich. "
            + "Da ich allerdings noch nicht weiß, ob ich das Projekt noch mal aufnehmen werde, "
            + "ist der Source-Code nicht offen verfügbar.",
        links: [
            {
                text: "Demo Video",
                url: "/videos/untitled_ghost_game.mp4",
            },
        ],
    },
];

export default projects;

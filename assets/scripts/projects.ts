import type { Project } from "assets/scripts/types";

const projects: Project[] = [
    {
        name: "zitatsuchmaschine",
        title: "Zitatsuchmaschine",
        year: 2024,
        context: "SHK (HU zu Berlin)",
        type: "Webseite",
        about:
            "Die an der Humboldt-Universität zu Berlin entwickelte Zitatsuchmaschine ermöglicht es Nutzern, Zitate aus "
            + "dem Web zu extrahieren und gezielt nach Zitaten von bestimmten Personen oder zu spezifischen Themen zu "
            + "suchen. In diesem Projekt war ich verantwortlich für die Neugestaltung, Implementierung und das "
            + "Deployment der Webseite, während meine Kollegen das Crawlen und Extrahieren der Zitate sowie die Pflege "
            + "der Datenbank übernommen haben. Die Seite habe ich mit Next.js entwickelt und mit PM2 deployt. Leider "
            + "ist dieses Projekt nicht Open Source, aber die Seite kann über den untenstehenden Link besucht werden.",
        links: [
            {
                text: "Besuchen",
                url: "https://zitatsuchmaschine.informatik.hu-berlin.de/",
            },
        ],
    },
    {
        name: "verivote",
        title: "Verivote",
        year: 2024,
        context: "Hobbyprojekt",
        type: "Webseite",
        about:
            "Verivote ist die Neuauflage einer früheren Webseite von mir, die ursprünglich mit PHP und MariaDB "
            + "entwickelt wurde. Die Plattform ermöglicht es Nutzern, Umfragen zu erstellen und mit Freunden zu teilen. "
            + "Ein besonderes Merkmal von Verivote ist die Unterstützung verschiedener Abstimmungsverfahren, wie zum "
            + "Beispiel das Sortieren der Kandidaten nach Präferenzen. Da die ursprüngliche Umsetzung nicht mehr meinen "
            + "aktuellen technischen Anforderungen entsprach, habe ich das Projekt vollständig überarbeitet und das "
            + "Design dezent angepasst. Das Frontend basiert nun auf Next.js, während das Backend in Go entwickelt "
            + "wurde. Die MariaDB-Datenbank wurde durch MongoDB ersetzt, was eine deutlich vereinfachte "
            + "Datenmodellierung ermöglicht.",
        links: [
            {
                text: "Besuchen",
                url: "https://verivote.eu/",
            },
            {
                text: "GitHub",
                url: "https://github.com/konstantin-lukas/verivote",
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
            "Oslo ist eine von mir entwickelte Desktop-App zur persönlichen Finanzverwaltung. Die Daten werden dabei "
            + "ausschließlich in einer lokalen SQLite-Datenbank auf dem Rechner des Nutzers gespeichert und niemals an"
            + "Dritte weitergegeben. Das Projekt habe ich mit Electron und React umgesetzt. Der Quellcode ist"
            + "vollständig öffentlich und über den untenstehenden Link zugänglich. Die App befindet sich bereits in der"
            + "dritten Version. Ursprünglich habe ich sie in Python entwickelt, später mit Electron und Vanilla "
            + "JavaScript neu geschrieben und schließlich in React umgesetzt. Durch die Umsetzung desselben Projekts "
            + "mit drei verschiedenen Technologien konnte ich wertvolle Erfahrungen sammeln.",
        links: [
            {
                text: "GitHub",
                url: "https://github.com/konstantin-lukas/oslo",
            },
            {
                text: "Store",
                url: "https://www.microsoft.com/store/productId/9N26D41H49GF?ocid=pdpshare",
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
            "Anzol ist eine JavaScript-Bibliothek für React, die nützliche Hooks wie useFetch bereitstellt, welche "
            + "leider weder in Standard-React noch in Next.js enthalten sind. Vor Anzol habe ich bereits eine andere "
            + "JavaScript-Bibliothek entwickelt. Anders als bei dem vorherigen Projekt, habe ich dieses mal gelernt, "
            + "wie man eine Bibliothek speziell für React erstellt und wie man die notwendigen GitHub Actions für "
            + "CI/CD einrichtet. Wenn ein neuer Tag gepusht wird, erstellt das System automatisch ein neues Release "
            + "auf GitHub und lädt eine aktualisierte Version auf NPM hoch. Das Projekt umfasst zudem automatisierte "
            + "Tests, um sicherzustellen, dass alles reibungslos funktioniert. Das GitHub-Repository ist unten"
            + "verlinkt.",
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
            "Nox ist eine Metalband aus Berlin, für die ich im Rahmen meiner Ausbildung bei Zalando eine Webseite "
            + "sowie ein Logo gestaltet habe. Dieses Projekt war mein erstes größeres Vorhaben, das ich für einen "
            + "externen Auftraggeber realisiert habe. Allein die Planungsphase für die Webseite und das Logo erstreckte "
            + "sich über mehrere Wochen und erforderte zahlreiche Meetings mit der Band. Nachdem ich das Logo und die "
            + "Screendesigns in Adobe Illustrator entworfen hatte, begann die Implementierung. Die Webseite hat "
            + "bewusst wenige Abhängigkeiten und enthält daher viele maßgeschneiderte Lösungen, einschließlich eines "
            + "komplett selbst entwickelten CMS. Damals habe ich die Seite in PHP ohne die Unterstützung eines "
            + "Frameworks umgesetzt. Heute würde ich einen anderen Ansatz wählen, was jedoch zeigt, wie viel ich seit"
            + "dem gelernt habe.",
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
            "Irgendwann entwickelte ich ein starkes Interesse daran, eine eigene Library zu schreiben, und begann zu "
            + "überlegen, was ein angemessener Umfang für ein erstes Projekt dieser Art sein könnte. Schließlich kam "
            + "ich auf die Idee, eine Library zu entwickeln, die Währungsinputs erstellt – also Zahlenfelder, die ihre "
            + "Inhalte als Währungsstrings formatieren. Ursprünglich habe ich das Projekt in reinem JavaScript "
            + "umgesetzt. Da dies mittlerweile nicht mehr meinen persönlichen Qualitätsstandards entspricht und das "
            + "Projekt dennoch einige Sterne sammeln konnte, habe ich es komplett neu in TypeScript geschrieben und "
            + "automatisierte Tests mit Jest hinzugefügt.",
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
            "Im Rahmen meines Computergrafik-Kurses an der Universität mussten wir ein selbstgewähltes Projekt "
            + "entwickeln. Ich hatte bereits zuvor an einem kleinen Spiel gearbeitet, in dem der Spieler Geister mit "
            + "einer Taschenlampe vertreiben muss. Ursprünglich habe ich dieses Projekt begonnen, um C++ zu lernen, "
            + "nachdem ich Effective Modern C++ von Scott Meyers gelesen hatte. Für den Kurs setzte ich die "
            + "Entwicklung des Spiels fort. Das Spiel wurde mit SDL2 entwickelt, einer Library, die es ermöglicht, "
            + "Texturen zu rendern und Controller-Eingaben zu nutzen. Im Gegensatz zu einer ausgearbeiteten "
            + "Spiele-Engine wie Unreal musste ich sämtliche Spielmechaniken selbst implementieren. Auch das Erstellen "
            + "von Texturen und Animationen musste ich erstmal lernen und hat mich viel Mühe gekostet. Da ich "
            + "unsicher bin, ob ich das Spiel in Zukunft weiterentwickeln werde, ist es derzeit nicht Open Source, "
            + "aber unten finden Sie einen Link zu einem kurzen Demovideo.",
        links: [
            {
                text: "Gameplay",
                url: "/videos/untitled_ghost_game.mp4",
            },
        ],
    },
];

export default projects;

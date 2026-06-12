# Front-end för Projektuppgift i Backend - Kundgränssnitt

## [E4-Haket](https://projekt-frontend-pe90.onrender.com/)

Detta gränssnitt, till för kunderna, välkomnar med en startsida där dagens meny visas. Bilder, primära ingredienser, allergener, diet (vegetarisk, vegansk) och pris visas. Dessa hämtas in med GET från backend.
Överst finns en navigationsmeny för undersidor till beställningar, kontakt och om. I beställningar körs ytterligare en identisk GET som på förstasidan. Här kan man skapa en beställning och skicka den med en POST till backend. 
PUT och DELETE används inte på förstasidan, så det egentligen inte finns något syfte med att kunder ska redigera och radera innehåll.

Felmeddelanden visas i gränssnittet för "lätta" fel. I formulären får man felmeddelande om fält är tomma eller något saknas, detta är för att undvika onödiga fetches till backend. 
Uppfylls gränssnittets krav körs en fetch till backend med mer noggrann felsökning, så som minimilängd och format på tel.nr och e-post.

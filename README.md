# Thanatarchia

- [Play online](#play-online)
- [Play locally](#play-locally)
- [Future plans](#future-plans)
- [Credits](#credits)

> _The unruly Moorish tribe rages against its own flesh, the Goths utterly destroy the Burgundians, and again the Alamanni wear arms for the conquered, and the Tervingi too, ... with the help of a band of Taifali join battle with the Vandals and Gepids. ... The Burgundians have taken over the land of the Alamanni, but obtained at great cost to themselves. The Alamanni have lost the land but seek to regain it._

&nbsp;&nbsp;&nbsp;&nbsp;— [Genethliacus of Maximian Augustus, Panegyrici Latini XI, 17](https://www.jassa.org/?p=7497)

> _House against house, town against town; if you see a man, knock him down._

&nbsp;&nbsp;&nbsp;&nbsp;— Traditional (from the rules of the [Haxey Hood](https://en.wikipedia.org/wiki/Haxey_Hood), a rough English 'folk football' game)

The year is 499. In the west, the Roman Empire is a patchwork of barbarian successor states. In the east, it lives on as Byzantium, still a force to be reckoned with. Who will survive? Who will triumph? What even is triumph anyway?

## Play online

[Thanatarchia](https://thanatarchia.netlify.app/)

Select the territory with your faction colour to schedule attacks. Select another territory to spy on it. End Turn to execute all scheduled attacks. Explore the help menu. In particular, ask about how to play.

## Play locally

Clone this repository:

```sh
git clone https://github.com/pjtunstall/thanatarchia
cd thanatarchia

```

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Then open a browser and navigate to [http://localhost:8080](http://localhost:8080).

## Future plans

Feedback so far has been that the game is far from intuitive. I've started to address this with a "how to play" guide in the help topics, but the UI should ideally be clearer. I could feed in info more incrementally, maybe with hints relating it individual parts the first time you interact with them.

Another issue is that there's not a lot to actually do in the game. There should be more variety of actions to make it interesting. Proper conversations with other rulers could be fun, and conversations where you can make meaningful choices. More generally, too much is random.

There could be a safety buffer to protect you from losing too abruptly or on the first turn. The game-over screen could present more information about how well you did, and let you see the map still. It shouldn't be visible at all behind the modals that show the outcome of battles.

For now, change of faith is just a placeholder. Eventually, this could be made to affect friendliness of factions or who you can make alliances with if I add a system of alliances.

I'd like to add more images: in particular, different avatars for all faction leaders.

## Credits

Thanks to Lovable AI for helping me whip up the initial prototype in a day (including the map and some of the chronicler images), and to ChatGPT 4 for much help over the rest of the month that it took me till I had something ready to deploy. Salutes too to AI genius of last resort, Claude.

AI images mainly from Copilot, with a few from Chat.

Eagle brooch image from [The Morgan Library & Museum](https://www.themorgan.org/objects/item/290015), New York.

Raven, squirrel, and coinbag sounds, [freesound_community](https://pixabay.com/users/freesound_community-46691455/). Marching sound from [kakaist](https://pixabay.com/users/kakaist-48093450). Church bell from [Universfield](https://pixabay.com/users/universfield-28281460). Pen writing from [ALIENIGHTMARE](https://pixabay.com/users/alienightmare-42489797). All via Pixabay.

The Vandal name generator owes a lot to Nicholetta Francovich Onesti's "[Tracing the language of the Vandals](https://www.academia.edu/691311/Tracing_the_Language_of_the_Vandals)". Goti e Vandali. Rome: Artemide. pp. 179–195, and "[The Language and Names of the Vandals](https://www.academia.edu/1516556/THE_LANGUAGE_AND_NAMES_OF_THE_VANDALS)", Das Konigreich der Vandalen: Erben des Imperiums in Nordafrika, Karlsruhe 2009.

For the Gothic name generator, I consulted Gerhard Koebler's [Gotisches Wörterbuch](https://www.koeblergerhard.de/gotwbhin.html), Appendix 3: [gotischen Namen](https://www.koeblergerhard.de/got/tg/got_namen.pdf). As with the Vandal names, I chose to let the names reflect post-Wulfilan developments (innovations on the Biblical Gothic of the 4th century), such as loss of the nominative singular ending -s.

Thematic inspiration: Herbert F. Bushman's [The Dark Ages Podcast](https://darkagespod.com/), which I listened to night and day this month. I fell asleep listening to it, and it got into my dreams.

I must also credit Lovable with one of the jokes. I'll let you guess which.

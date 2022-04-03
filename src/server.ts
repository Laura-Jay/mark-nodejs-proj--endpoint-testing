import express from "express";
import {
  ADVENTURE_ADMIN,
  MYSTERIOUS_ROBED_FIGURE,
} from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL, HELL } from "./constants/locations";

const app = express();

app.get("/", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

app.get("/help", (req, res) => {
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text:
        "This is the endpoint adventure! It's based on the classic 'choose your own adventure' books of ye olden 20th century times. When you visit an endpoint, you're presented with a scene and some text, and then you have a few options to choose from - your simulate turning to a new page by hitting a new endpoint.",
    },
    options: {
      backToStart: "/",
    },
  });
});

app.get("/quest/accept", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Ah, yes, that is a wise decision. Now, tell me, what sort of questing experience do you have?",
    },
    options: {
      rookie: "/quest/start/easy",
      pro: "/quest/start/hard",
      "completed it, m8": "/quest/start/impossible",
    },
  });
});

app.get("/quest/decline", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "You FOOL! You have made a mistake. Now you will suffer.",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/easy", (req, res) => {
  res.json({
    location: "RSPCA",
    speech: {
      speaker: {
        name: "Mr Fluffykins",
        description: "A large fluffy cat"
      },
      text:
        "Welcome adventurer, to pass this test you must choose a one of these cats to give a snuggle to.",
    },
    options: {
      tabbyCat: "/quest/start/easy/tabby",
      blackCat: "quest/start/easy/black"
    },
  });
});

app.get("/quest/start/easy/:cat", (req,res) => {
  const chosenCat = req.params.cat
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: `You chose ${chosenCat}, congratulations adventurer you have completed the quest! Why not try it again in hard mode?`     
    },
    options: {
      restart: "/",
      hardMode: "/quest/start/hard"
    }
  })
})

app.get("/quest/start/hard", (req, res) => {
  res.json({
    location: "Cave (interior)",
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "To progress in your quest you must answer this riddle: I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    },
    options: {
      answer: "/quest/start/hard/<your one word answer here>",
    },
  });
});

app.get<{ answer: string }>("/quest/start/hard/:answer", (req, res) => {
  let solution = "";
  const providedAnswer = req.params.answer
  function giveAnswer(){
  if (req.params.answer.toLowerCase() === "map"){
    solution = "Congratulations adventurer, you have completed your quest!"
  } else {
    solution = "You FOOL! You have made a mistake. Now you will suffer."
  } return solution;
  }
  const adventureText = giveAnswer()
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        `Your answer was ${providedAnswer}. ${adventureText}`
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/impossible", (req, res) => {
  res.json({
    location: HELL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text:
        "A dragon appears and breaths a fireball, you die an excruciating death!",
    },
    options: {
      restart: "/",
    },
  });
});

export default app;

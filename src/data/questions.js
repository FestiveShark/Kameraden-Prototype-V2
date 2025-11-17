// PLACEHOLDER QUESTIONS FILE
// Fill in your own questions in Dutch!
// Use {name} as a placeholder for the player's name in third-person questions

export const questionsData = {
  // Third person questions (asked about the Kameraad)
  thirdPerson: {
    vibing: [
      "Wat is {name}'s verborgen talent?",
      "Welk TV-personage lijkt het meest op {name}?",
      "Wat is {name}'s 'spirit animal'?",
      "Als {name} een pizza was, welke toppings zou die dan hebben?",
      "Wat is de meest waarschijnlijke manier waarop {name} beroemd zou worden?",
    ],
    diep: [
      "Wat is {name}'s favoriete kleur?",
      "Welk beroep zou {name} willen hebben?",
      "Wat is {name}'s favoriete vakantiebestemming?",
      "Welk huisdier zou {name} willen hebben?",
      "Wat is {name}'s favoriete sport?",
    ],
    dieper: [
      "Wat is {name}'s grootste talent?",
      "Waar is {name} het meest trots op?",
      "Wat zou {name} doen met 1 miljoen euro?",
      "Wat is {name}'s grootste droom?",
      "Welke persoon bewondert {name} het meest?",
    ],
    diepst: [
      "Wat is {name}'s grootste zwakte?",
      "Wat zou {name} veranderen aan zijn/haar verleden?",
      "Wat is {name}'s grootste angst voor de toekomst?",
      "Welk geheim heeft {name} nog nooit verteld?",
      "Wat zou {name} doen als hij/zij nog maar één dag te leven had?",
    ],
  },
};

// Helper function to get a random question
export function getRandomQuestion(difficulty, playerName, askedQuestions) {
  const allQuestions = questionsData.thirdPerson[difficulty] || [];

  if (allQuestions.length === 0) {
    return "Vraag niet beschikbaar. Voeg vragen toe aan src/data/questions.js";
  }

  const availableQuestions = allQuestions.filter(q => !askedQuestions[difficulty].includes(q));

  if (availableQuestions.length === 0) {
    // If all questions have been asked, return one of the already asked questions
    // This is a fallback to prevent crashing. The asked question list won't be updated for this.
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    let question = allQuestions[randomIndex];
    question = question.replace(/{name}/g, playerName);
    return question;
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  let question = availableQuestions[randomIndex];
  
  // Replace {name} placeholder with actual player name
  question = question.replace(/{name}/g, playerName);
  
  return question;
}
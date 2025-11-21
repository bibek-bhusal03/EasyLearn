import { generateQuestionsFromPDF } from "./utils/generateQuestion";
import path from "path";

(async () => {
  const questions = await generateQuestionsFromPDF(
    path.join(__dirname, "sample.pdf")
  );

  console.log("\nYour 10 questions:\n");
  console.log(JSON.stringify(questions, null, 2));
})();
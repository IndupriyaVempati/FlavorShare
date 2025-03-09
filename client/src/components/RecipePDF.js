import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RecipePDF = ({ recipe }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10; // Starting Y-axis position

    // ✅ Set PDF Title & Font
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(` Recipe Name: ${recipe.title}`, 10, y);
    y += 10;

    // ✅ Ingredients Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(" Ingredients:", 10, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // ✅ Render Ingredients with Text Wrapping + Auto Page Break
    recipe.ingredients.split(",").forEach((item, index) => {
      const text = `• ${item.trim()}`;
      const splitText = doc.splitTextToSize(text, 180); // ✅ Text Wrapping

      splitText.forEach((line) => {
        if (y > 270) {
          // ✅ Auto Page Break
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += 8;
      });
    });

    // ✅ Instructions Section
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(" Instructions:", 10, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // ✅ Render Instructions with Text Wrapping + Auto Page Break
    recipe.instructions.split(".").forEach((step, index) => {
      if (step.trim() !== "") {
        const text = `${index + 1}. ${step.trim()}`;
        const splitText = doc.splitTextToSize(text, 180); // ✅ Text Wrapping

        splitText.forEach((line) => {
          if (y > 270) {
            // ✅ Auto Page Break
            doc.addPage();
            y = 10;
          }
          doc.text(line, 10, y);
          y += 8;
        });
      }
    });

    // ✅ Footer Section
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
    y += 10;
    doc.setFont("courier", "italic");
    doc.setFontSize(10);
    doc.text(" Powered by Flavorshare :)", 10, y);

    // ✅ Download PDF
    doc.save(`${recipe.title}.pdf`);
  };

  return (
    <button className="btn btn-primary my-2" onClick={handleDownloadPDF}>
      💾 Download PDF
    </button>
  );
};

export default RecipePDF;

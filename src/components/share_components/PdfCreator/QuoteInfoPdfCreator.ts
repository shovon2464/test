// @ts-ignore:next-line
import CSIOPolicy from "../../../doc/pdf/CSIOPolicy.pdf";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";

const QuoteInfoPdfCreator = async (quoteInfo: {}, pageIndex?: number) => {
  pageIndex = 0;
  const formArrayBufferBytes = await fetch(CSIOPolicy).then((res) =>
    res.arrayBuffer()
  );

  const quotePdfDoc = await PDFDocument.load(formArrayBufferBytes);
  const timesRomanFont = await quotePdfDoc.embedFont(StandardFonts.TimesRoman);

  const quotePdfPages = quotePdfDoc.getPages();

  const targetPage = quotePdfPages[pageIndex];

  const { width, height } = targetPage.getSize();

  targetPage.drawText("This is a test text by using coordinates x y", {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: timesRomanFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  });

  const filledPdfBytes = await quotePdfDoc.save();

  return filledPdfBytes;
};

export default QuoteInfoPdfCreator;

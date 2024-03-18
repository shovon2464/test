import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { retrieveQuotesPdfCoordinatesList } from "../../../../action_creators/tools/quote_pdf_coordinates/quote_pdf_coordinates";

interface ICoordinatesProps {
  PageNum: string;
  XAxis: string;
  YAxis: string;
}

const QuotePdfCoordinates: React.FC = () => {
  const initialCoordinates: ICoordinatesProps[] = [];
  const dispatch = useAppDispatch();
  const quotePdfInfoList = useAppSelector(
    (state) => state.quotePdfCoordinates.quotePdfCoordinates
  );
  const quotePdfInfo = useAppSelector(
    (state) => state.quotePdfCoordinates.quotePdfCoordinate
  );

  useEffect(() => {
    dispatch(retrieveQuotesPdfCoordinatesList({}));
  }, []);

  useEffect(() => {
    const coordinates = quotePdfInfo.PDF_Coordinates.split(",");

    coordinates.forEach((value) => {
      const eachCoordinatesArray = value.split(" ");
      let initialCoordinateObj: ICoordinatesProps = {
        PageNum: eachCoordinatesArray[0],
        XAxis: eachCoordinatesArray[1],
        YAxis: eachCoordinatesArray[2],
      };
      initialCoordinates.push(initialCoordinateObj);
    });
  }, [quotePdfInfo]);

  return <div></div>;
};

export default QuotePdfCoordinates;

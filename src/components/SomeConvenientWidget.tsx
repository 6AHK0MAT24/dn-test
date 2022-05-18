import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../store/fetchData";
import { useTranslation } from "react-i18next";
import { CButton, CSpinner } from "@coreui/react";

export const SomeConvenientWidget: FC = () => {
  const [seconds, setSeconds] = useState(100);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 100, seconds - 1);
    }
  }, [seconds, timerActive]);

  const { data, status } = useQuery("dataQuery", fetchData);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ru")}>RU</button>
      <hr />
      <>
        <button
          className="btn btn-info"
          style={timerActive ? { display: "none" } : { display: "block" }}
          onClick={() => setTimerActive(!timerActive)}
        >
          Начать эмуляцию
        </button>
      </>
      {status === "loading" && seconds < 100 && seconds > 75 && (
        <CButton disabled>
          <CSpinner component="span" size="sm" aria-hidden="true" />
          {t("Loading.First")}
        </CButton>
      )}
      {status === "loading" && seconds <= 75 && seconds > 40 && (
        <CButton disabled>
          <CSpinner component="span" size="sm" aria-hidden="true" />
          {t("Loading.Second")}
        </CButton>
      )}
      {status === "loading" && seconds <= 40 && seconds > 0 && (
        <CButton disabled>
          <CSpinner component="span" size="sm" aria-hidden="true" />
          {t("Loading.Third")}
        </CButton>
      )}
      {status === "success" && (
        <>
          <CButton className="btn btn-success" disabled>
            {t("Loading.LoadingFinished")}
          </CButton>
          <div>
            {data.map((x: any) => (
              <div key={x.id}>
                {x.userId} - {x.title} - {x.body}
              </div>
            ))}
          </div>
        </>
      )}
      {(status === "loading" || status === "error") && seconds === 0 && (
        <>
          <CButton className="btn btn-danger" disabled>
            {t("Loading.Error")}
          </CButton>
        </>
      )}
    </>
  );
};

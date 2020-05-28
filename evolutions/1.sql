CREATE TABLE public."user_history" (
  "date"  date    NOT NULL,
  "count" integer NOT NULL
);

ALTER TABLE ONLY public."user_history"
  ADD CONSTRAINT "PK_user_history" PRIMARY KEY (date);

#DOWN

DROP TABLE public."user_history";
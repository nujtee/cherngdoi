import { Fragment } from "react";
import { splitPhones, telHref } from "../../shared/phones.ts";

/** One `tel:` link per number of a comma-separated phone list ("063 795 1218, 095 579 0679"). */
export function PhoneLinks({ value }: { value: string }) {
  return (
    <>
      {splitPhones(value).map((phone, i) => (
        <Fragment key={`${i}-${phone}`}>
          {i > 0 && ", "}
          <a href={telHref(phone)}>{phone}</a>
        </Fragment>
      ))}
    </>
  );
}

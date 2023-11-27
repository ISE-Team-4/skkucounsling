import { remote } from "./RemoteSource";

const issueCSRF = async () => {
  remote
    .get("signup/")
    .onSuccess((json: string) => {})
    .onFailed((code: number, msg?: string) => {})
    .send();
};

const fetchFileWithQuery = (url: string) => {
  const downloadLink = document.createElement("a");
  const protocol = window.location.href.split("://")[0];
  const currentUrl = window.location.href
    .split("://")[1]
    .split("/")[0]
    .replace("3000", "8000");
  downloadLink.href = protocol + "://" + currentUrl + url;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export { issueCSRF, fetchFileWithQuery };

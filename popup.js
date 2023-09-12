chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fetchUserInfo,
  });
});

function fetchUserInfo() {
  // Replace this code with your logic to fetch user information from the webpage.
  // const userInfo = {
  //   name: "John Doe",
  //   email: "johndoe@example.com",
  // };

  const c_name = document.getElementsByClassName('ember-view text-display-medium-bold org-top-card-summary__title full-width')[0].innerText;
  const c_overview = document.getElementsByClassName('break-words white-space-pre-wrap t-black--light text-body-medium')[0].innerText;
  const c_details = document.getElementsByClassName('org-top-card-summary-info-list')[0].innerText;
  const more_info = document.getElementsByTagName('dd');
  const c_image = document.getElementsByClassName('evi-image lazy-image ember-view org-top-card-primary-content__logo')[0].currentSrc; 
  const c_company_size = more_info[2].innerText;
  const c_industry = more_info[1].innerText;
  const c_founded = more_info[4].innerText;
  const c_website = more_info[0].innerText;
  const c_specialities = more_info[5].innerText;

  const companyInformation = {
    c_image: c_image,
    c_name: c_name,
    c_details: c_details,
    c_overview: c_overview,
    c_website: c_website,
    c_other_info: more_info,
    c_company_size: c_company_size,
    c_industry: c_industry,
    c_founded: c_founded,
    c_specialities: c_specialities
  };

  console.log("__content____companyInformation_______", companyInformation);
  chrome.runtime.sendMessage(companyInformation);
}

// Listen for messages from the background script and display the user information.
chrome.runtime.onMessage.addListener(function (userInfo) {
  console.log("_______GGGGGG_____", userInfo)
  const userInfoElement = document.getElementById("userInfo");
  const c_name = document.getElementById("c_name");
  const c_overview = document.getElementById("c_overview");
  const c_company_size = document.getElementById("c_company_size");
  const c_industry = document.getElementById("c_industry");
  const c_specialities = document.getElementById("c_specialities");
  const c_founded = document.getElementById("c_founded");
  const c_website = document.getElementById("c_website");
  const c_image = document.getElementById("c_image");
  c_company_size.innerHTML = userInfo?.c_company_size;
  c_specialities.innerHTML = userInfo?.c_specialities;
  c_industry.innerHTML = userInfo?.c_industry;
  c_founded.innerHTML = userInfo?.c_founded;
  c_website.innerHTML = userInfo?.c_website;
  c_name.innerHTML = userInfo?.c_name;
  c_overview.innerHTML = userInfo?.c_overview;
  c_image.src = userInfo?.c_image;
});

const presence = new Presence({
  clientId: "768903129194037260"
});

presence.on("UpdateData", () => {
  const doc = document.location,
    path = doc.pathname,
    route = path.split("/"),
    browsingStamp = Math.floor(Date.now() / 1000),
    presenceData: PresenceData = {
      largeImageKey: "lawco",
      startTimestamp: browsingStamp
    };
  
  if (path == "/") {
    presenceData.details = "Browsing the homepage"
  };

  switch (route[1]) {  
    default:
      break;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData)
  }
});
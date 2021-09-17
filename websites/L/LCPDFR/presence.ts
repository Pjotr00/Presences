const presence = new Presence({
    clientId: "768903129194037260"
});

presence.on("UpdateData", () => {
    const doc = document.location,
    path = doc.pathname,
    route = path.split("/"),
    browsingStamp = Math.floor(Date.now() / 1000),
    presenceData: PresenceData = {
      largeImageKey: "lcpdfr",
      startTimestamp: browsingStamp
    };

    if (path == "/") {
        presenceData.details = "Browsing the homepage";
    }

    switch (route[1]) {
        // News app
        case "news":
            if (route[3]) {
                presenceData.details = "Reading a news article";
                presenceData.state = document.querySelector("h1.ipsType_pageTitle").textContent;
            }
            else {
                presenceData.details = "Browsing the news";
            }
            break;

        // Forums
        case "forums":
            switch (route[2]) {
                case "forum":
                    presenceData.details = "Viewing a forum";
                    presenceData.state = document.querySelector(".ipsType_pageTitle").textContent.trim();
                    break;
                case "topic":
                    presenceData.details = "Reading a forum topic";
                    presenceData.state = document.querySelector("h1.ipsType_pageTitle").textContent.trim();
                    break;
                default:
                    presenceData.details = "Browsing the forums";
                    break;
            }
            break;
        
        case "gallery":
            switch (route[2]) {
                case "category":
                    presenceData.details = "Viewing a gallery category";
                    presenceData.state = document.querySelector(".ipsType_pageTitle").textContent.trim();
                    break;
                
                case "album":
                    presenceData.details = "Viewing an album";
                    presenceData.state = `"${document.querySelector("h1.ipsType_pageTitle").textContent.trim()}" by ${document.querySelector("span.ipsType_normal:nth-child(3) > a:nth-child(1)").textContent.trim()}`;
                    break;
                
                case "image":
                    presenceData.details = "Viewing a photo";
                    presenceData.state = `"${document.querySelector(".cGalleryImageTitle > h1:nth-child(1)").textContent.trim()}" by ${document.querySelector("p.ipsType_sectionHead").textContent.trim()}`;
                    break;
            
                default:
                    presenceData.details = "Viewing the gallary";
                    break;
            }
            break;
        
        case "guideline-hub":
            if (route[2]) {
                presenceData.details = "Reading a guideline page";
                presenceData.state = document.querySelector(".ipsType_pageTitle").textContent.trim();
            }
            else {
                presenceData.details = "Browsing the guidelines";
            }
            break;
        
        case "leaderboard":
            presenceData.details = "Viewing the leaderboard";
            break;
        
        case "pastleaders":
            presenceData.details = "Viewing the past leaders";
            break;
        
        case "topmembers":
            presenceData.details = "Viewing the top members";
            break;

        default:
            break;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
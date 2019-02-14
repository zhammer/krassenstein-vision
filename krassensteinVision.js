// symbols
const BRIAN = "BRIAN";
const ED = "ED";

// data
const BRIAN_FULLNAME = "Brian Krassenstein";
const ED_FULLNAME = "Ed Krassenstein";
const BRIAN_USERNAME = "krassenstein";
const ED_USERNAME = "EdKrassen";
const BRIAN_AVATAR = "https://pbs.twimg.com/profile_images/979820353475117057/P1XFvbc2_bigger.jpg";
const ED_AVATAR = "https://pbs.twimg.com/profile_images/1032612349633486848/t35esAW6_bigger.jpg";
const BRIAN_COVER_SMALL = "https://pbs.twimg.com/profile_banners/133938408/1521227193/600x200";
const ED_COVER_SMALL = "https://pbs.twimg.com/profile_banners/132339474/1537441493/600x200";

function krassensteinBrother(userId) {
  return userId.slice(-1) < 5 ? ED : BRIAN;
}

function fullname(brother) {
  return brother === BRIAN ? BRIAN_FULLNAME : ED_FULLNAME;
}

function username(brother) {
  return brother === BRIAN ? BRIAN_USERNAME : ED_USERNAME;
}

function avatar(brother) {
  return brother === BRIAN ? BRIAN_AVATAR : ED_AVATAR;
}

function coverSmall(brother) {
    return brother === BRIAN ? BRIAN_COVER_SMALL : ED_COVER_SMALL;
}

function setDekrassensteinableTextContent(domNode, text) {
    if (!domNode.dataset.krassensteinOriginalText) {
        domNode.dataset.krassensteinOriginalText = domNode.textContent;
    }
    domNode.textContent = text;
}

function setDekrassensteinableSrc(domNode, src) {
    if (!domNode.dataset.krassensteinOriginalSrc) {
        domNode.dataset.krassensteinOriginalSrc = domNode.src;
    }
    domNode.src = src;
}

function setDekrassensteinableStyle(domNode, style) {
    if (!domNode.dataset.krassensteinOriginalStyle) {
        domNode.dataset.krassensteinOriginalStyle = domNode.style;
    }
    domNode.style = style;
}

function krassensteinifyTimelineTweets() {
  let tweets = document.querySelectorAll(".tweet");
  tweets.forEach(tweet => {
    const userId = tweet.dataset.userId;
    if (!userId) {
      return;
    }
    const brother = krassensteinBrother(userId);
    setDekrassensteinableTextContent(tweet.querySelector(".fullname"), fullname(brother));
    setDekrassensteinableTextContent(tweet.querySelector(".username").firstElementChild, username(brother));
    setDekrassensteinableSrc(tweet.querySelector(".js-action-profile-avatar"), avatar(brother));

    // update retweet user link
    let retweetUserLink = tweet.querySelector(".js-retweet-text");
    if (retweetUserLink) {
      const brother = krassensteinBrother(retweetUserLink.firstElementChild.dataset.userId);
      setDekrassensteinableTextContent(retweetUserLink.querySelector("b"), username(brother));;
    }

    // update quoted tweet
    let quotedTweet = tweet.querySelector(".QuoteTweet-innerContainer");
    if (quotedTweet) {
      const brother = krassensteinBrother(quotedTweet.dataset.userId);
      setDekrassensteinableTextContent(quotedTweet.querySelector(".QuoteTweet-fullname"), fullname(brother));
      setDekrassensteinableTextContent(quotedTweet.querySelector(".username").firstElementChild, username(brother));
    }
  });
}

function krassensteinifyFollowRecommendations() {
  let accounts = document.querySelectorAll(".js-account-summary");
  accounts.forEach(account => {
    const userId = account.dataset.userId;
    if (!userId) {
      return;
    }
    const brother = krassensteinBrother(userId);
    setDekrassensteinableSrc(account.querySelector(".js-action-profile-avatar"), avatar(brother));
    setDekrassensteinableTextContent(account.querySelector(".fullname"), fullname(brother));
    setDekrassensteinableTextContent(account.querySelector(".username").firstElementChild, username(brother));
  });
}

function krassensteinifyHoverProfileCard() {
  let cards = document.querySelectorAll(".profile-card");
  cards.forEach(card => {
    const userId = card.parentElement.dataset.userId;
    if (!userId) {
      return;
    }
    const brother = krassensteinBrother(userId);
    setDekrassensteinableTextContent(card.querySelector(".fullname"), fullname(brother));
    setDekrassensteinableTextContent(card.querySelector(".ProfileCard-screennameLink").querySelector(".username").firstElementChild, username(brother));
    setDekrassensteinableSrc(card.querySelector(".js-action-profile-avatar"), avatar(brother));
    setDekrassensteinableStyle(card.querySelector(".ProfileCard-bg"), `background-image: url('${coverSmall(brother)}')`);
  });
}

function krassensteinifySmallLikeAvatars() {
    let smallLikeAvatars = document.querySelectorAll(".js-profile-popup-actionable");
    smallLikeAvatars.forEach(smallLikeAvatar => {
        const userId = smallLikeAvatar.dataset.userId;
        const brother = krassensteinBrother(userId);
        setDekrassensteinableSrc(smallLikeAvatar.firstElementChild, avatar(brother));
    })
}

// likes and retweets popups
function krassensteinifyAccounts() {
    let accounts = document.querySelectorAll(".account")
    accounts.forEach(account => {
        const brother = krassensteinBrother(account.dataset.userId);
        setDekrassensteinableSrc(account.querySelector(".js-action-profile-avatar"), avatar(brother));
        setDekrassensteinableTextContent(account.querySelector(".fullname"), fullname(brother));
        setDekrassensteinableTextContent(account.querySelector(".account-group").querySelector(".username").firstElementChild, username(brother));
    });
}

function krassensteinifyFollowsYouFollow() {
    let userAvatars = document.querySelectorAll(".Avatar")
    userAvatars.forEach(userAvatar => {
        const userId = userAvatar.parentElement.dataset.userId;
        if (!userId) {
            return;
        }
        const brother = krassensteinBrother(userId);
        setDekrassensteinableSrc(userAvatar, avatar(brother))
    })
}

// twitter.com/x/followers
function krassensteinifyProfileCards() {
    let cards = document.querySelectorAll(".ProfileCard");
    cards.forEach(card => {
        const userId = card.dataset.userId;
        if (!userId) {
          return;
        }
        const brother = krassensteinBrother(userId);
        setDekrassensteinableTextContent(card.querySelector(".fullname"), fullname(brother));
        setDekrassensteinableTextContent(card.querySelector(".ProfileCard-screennameLink").querySelector(".username").firstElementChild, username(brother));
        setDekrassensteinableSrc(card.querySelector(".js-action-profile-avatar"), avatar(brother));
        card.querySelector(".ProfileCard-bg").style = `background-image: url('${coverSmall(brother)}')`
      });
}

function krassensteinifyPageProfile() {
    const profileNav = document.querySelector(".ProfileNav");
    const userId = profileNav && profileNav.dataset.userId;
    if (!userId) {
        return
    }

    const brother = krassensteinBrother(userId)
    setDekrassensteinableSrc(document.querySelector(".ProfileAvatar-image"), avatar(brother));
    setDekrassensteinableTextContent(document.querySelector(".ProfileHeaderCard-nameLink"), fullname(brother));
    setDekrassensteinableTextContent(document.querySelector(".ProfileHeaderCard-screennameLink").querySelector(".username").firstElementChild, username(brother));

    const miniProfileCard = document.querySelector(".ProfileCardMini");
    if (miniProfileCard) {
        setDekrassensteinableSrc(miniProfileCard.querySelector(".ProfileCardMini-avatarImage"), avatar(brother));
        setDekrassensteinableTextContent(miniProfileCard.querySelector(".fullname"), fullname(brother));
        setDekrassensteinableTextContent(miniProfileCard.querySelector(".username").firstElementChild, username(brother));
    }
}

function krassensteinifyNotifications() {
    if (!document.URL.endsWith("notifications")) {
        return;
    }

    let userProfileLinks = document.querySelectorAll(".js-user-profile-link")
    userProfileLinks.forEach(userProfileLink => {
        const userId = userProfileLink.dataset.userId;
        if (!userId) {
            return;
        }
        const brother = krassensteinBrother(userId);
        setDekrassensteinableTextContent(userProfileLink.firstElementChild, fullname(brother))
    })

    let quotedTweets = document.querySelectorAll(".QuoteTweet-innerContainer")
    quotedTweets.forEach(quotedTweet => {
        const userId = quotedTweet.dataset.userId;
        if (!userId) {
            return;
        }

        const brother = krassensteinBrother(userId);
        setDekrassensteinableTextContent(quotedTweet.querySelector(".QuoteTweet-fullname"), fullname(brother));
        setDekrassensteinableTextContent(quotedTweet.querySelector(".username").firstElementChild, username(brother));

    })
}

function krassensteinifyPage() {
  chrome.storage.local.get(["krassensteinVisionOn"], result => {
    if (result.krassensteinVisionOn) {
      krassensteinifyTimelineTweets();
      krassensteinifyFollowRecommendations();
      krassensteinifyHoverProfileCard();
      krassensteinifySmallLikeAvatars();
      krassensteinifyAccounts();
      krassensteinifyFollowsYouFollow();
      krassensteinifyProfileCards();
      krassensteinifyPageProfile();
      krassensteinifyNotifications();
    }
  });
}

krassensteinifyPage();
setInterval(krassensteinifyPage, 500);

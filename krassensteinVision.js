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

function krassensteinifyTimelineTweets() {
  let tweets = document.querySelectorAll(".tweet");
  tweets.forEach(tweet => {
    const userId = tweet.dataset.userId;
    if (!userId) {
      return;
    }
    const brother = krassensteinBrother(userId);
    tweet.querySelector(".fullname").textContent = fullname(brother);
    tweet.querySelector(".username").firstElementChild.textContent = username(brother);
    tweet.querySelector(".js-action-profile-avatar").src = avatar(brother);

    // update retweet user link
    let retweetUserLink = tweet.querySelector(".js-retweet-text");
    if (retweetUserLink) {
      const brother = krassensteinBrother(retweetUserLink.firstElementChild.dataset.userId);
      retweetUserLink.querySelector("b").textContent = username(brother);
    }

    // update quoted tweet
    let quotedTweet = tweet.querySelector(".QuoteTweet-innerContainer");
    if (quotedTweet) {
      const brother = krassensteinBrother(quotedTweet.dataset.userId);
      quotedTweet.querySelector(".QuoteTweet-fullname").textContent = fullname(brother);
      quotedTweet.querySelector(".username").firstElementChild.textContent = username(brother);
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
    account.querySelector(".js-action-profile-avatar").src = avatar(brother);
    account.querySelector(".fullname").textContent = fullname(brother);
    account.querySelector(".username").firstElementChild.textContent = username(brother);
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
    card.querySelector(".fullname").textContent = fullname(brother);
    card.querySelector(".ProfileCard-screennameLink").querySelector(".username").firstElementChild.innerHTML = username(brother);
    card.querySelector(".js-action-profile-avatar").src = avatar(brother);
    card.querySelector(".ProfileCard-bg").style = `background-image: url('${coverSmall(brother)}')`
  });
}

function krassensteinifySmallLikeAvatars() {
    let smallLikeAvatars = document.querySelectorAll(".js-profile-popup-actionable");
    smallLikeAvatars.forEach(smallLikeAvatar => {
        const userId = smallLikeAvatar.dataset.userId;
        const brother = krassensteinBrother(userId);
        smallLikeAvatar.firstElementChild.src = avatar(brother);
    })
}

// likes and retweets popups
function krassensteinifyAccounts() {
    let accounts = document.querySelectorAll(".account")
    accounts.forEach(account => {
        const brother = krassensteinBrother(account.dataset.userId);
        account.querySelector(".js-action-profile-avatar").src = avatar(brother);
        account.querySelector(".fullname").textContent = fullname(brother);
        account.querySelector(".account-group").querySelector(".username").firstElementChild.textContent = username(brother);
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
        userAvatar.src = avatar(brother)
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
        card.querySelector(".fullname").textContent = fullname(brother);
        card.querySelector(".ProfileCard-screennameLink").querySelector(".username").firstElementChild.innerHTML = username(brother);
        card.querySelector(".js-action-profile-avatar").src = avatar(brother);
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
    document.querySelector(".ProfileAvatar-image").src = avatar(brother);
    document.querySelector(".ProfileHeaderCard-nameLink").textContent = fullname(brother);
    document.querySelector(".ProfileHeaderCard-screennameLink").querySelector(".username").firstElementChild.textContent = username(brother);

    const miniProfileCard = document.querySelector(".ProfileCardMini");
    if (miniProfileCard) {
        miniProfileCard.querySelector(".ProfileCardMini-avatarImage").src = avatar(brother);
        miniProfileCard.querySelector(".fullname").textContent = fullname(brother);
        miniProfileCard.querySelector(".username").firstElementChild.textContent = username(brother);
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
        userProfileLink.firstElementChild.textContent = fullname(brother)
    })

    let quotedTweets = document.querySelectorAll(".QuoteTweet-innerContainer")
    quotedTweets.forEach(quotedTweet => {
        const userId = quotedTweet.dataset.userId;
        if (!userId) {
            return;
        }

        const brother = krassensteinBrother(userId);
        quotedTweet.querySelector(".QuoteTweet-fullname").textContent = fullname(brother);
        quotedTweet.querySelector(".username").firstElementChild.textContent = username(brother);

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

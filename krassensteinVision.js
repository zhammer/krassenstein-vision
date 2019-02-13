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


function krassensteinBrother(userId) {
    return (userId.slice(-1) < 5) ? ED : BRIAN
}

function fullname(brother) {
    return brother === BRIAN ? BRIAN_FULLNAME : ED_FULLNAME
}

function username(brother) {
    return brother === BRIAN ? BRIAN_USERNAME : ED_USERNAME
}

function avatar(brother) {
    return brother === BRIAN ? BRIAN_AVATAR : ED_AVATAR
}

function krassensteinifyTimelineTweets() {
    let tweets = document.querySelectorAll(".tweet")
    tweets.forEach(tweet => {
        const userId = tweet.dataset.userId;
        if (!userId) {
            return;
        }
        const brother = krassensteinBrother(userId);
        tweet.querySelector(".fullname").textContent = fullname(brother)
        tweet.querySelector(".username").firstElementChild.textContent = username(brother)
        tweet.querySelector(".js-action-profile-avatar").src = avatar(brother)

        // update retweet user link
        let retweetUserLink = tweet.querySelector(".js-retweet-text")
        if (retweetUserLink) {
            const brother = krassensteinBrother(retweetUserLink.firstElementChild.dataset.userId);
            retweetUserLink.querySelector("b").textContent = username(brother);
        }

        // update quoted tweet
        let quotedTweet = tweet.querySelector(".QuoteTweet-innerContainer")
        if (quotedTweet) {
          const brother = krassensteinBrother(quotedTweet.dataset.userId)
          quotedTweet.querySelector(".QuoteTweet-fullname").textContent = fullname(brother)
          quotedTweet.querySelector(".username").firstElementChild.textContent = username(brother)
        }
    })
}


function krassensteinifyFollowRecommendations() {
  let accounts = document.querySelectorAll(".js-account-summary")
  accounts.forEach(account => {
    const userId = account.dataset.userId;
    if (!userId) {
      return;
    }
    const brother = krassensteinBrother(userId);
    account.querySelector(".js-action-profile-avatar").src = avatar(brother)
    account.querySelector(".fullname").textContent = fullname(brother)
    account.querySelector(".username").firstElementChild.textContent = username(brother)
  })
}

krassensteinifyTimelineTweets()
krassensteinifyFollowRecommendations()
setInterval(krassensteinifyFollowRecommendations, 1e3)
setInterval(krassensteinifyTimelineTweets, 1e3)

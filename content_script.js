$(() => {
  const links = document.getElementsByTagName("a");
  for (const link of links) {
    if (!link.href) {
      continue;
    }
    try {
      let url = new URL(link.href);
      if (url.host !== 'imgur.com') {
        continue;
      }
      const matches = link.href.match(/(?:\/(a|gallery|signin))?\/([^\W_]{5,8})(?:\/|\.[a-zA-Z]+|#([^\W_]{5,8}|\d+))?(\/new|\/all|\?\d*)?$/);
      if (matches.length < 3 && matches[2]) {
        continue;
      }
      const hash = matches[2];
      if (url.pathname.startsWith('/a/')) {
        ajaxCall(link, hash, 'a');

      } else if (url.pathname.startsWith('/gallery')) {
        ajaxCall(link, hash, 'g');
      } else {
        ajaxCall(link, hash, 'i');
      }
    } catch (e) {
      console.error(e);
    }
  }
});

function ajaxCall(node, hash, type) {
  let urlHash;
  switch (type) {
    case 'g':
      urlHash = "https://api.imgur.com/3/gallery/" + hash;
      break;
    case 'a':
      urlHash = "https://api.imgur.com/3/album/" + hash;
      break;
    default:
      urlHash = "https://api.imgur.com/3/image/" + hash;
  }
  $.ajax({
    type: "GET",
    url: urlHash,
    dataType: "json",
    headers: {
      'Authorization': 'Client-ID c606aeeec9ca098'
    },
    success: function (data) {
      try {
        let link = data.data.link;
        if (data.data.animated) {
          link = data.data.gifv;
        }
        node.href = link;
      } catch (e) {
        console.error(e);
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

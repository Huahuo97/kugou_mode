// js主要应用模块：轮播图+新歌首发+热门歌手
window.addEventListener("DOMContentLoaded", function() {
    /* 轮播图 */
    var silderWarp = document.querySelector(".silderWrap");
    var banner = silderWarp.querySelector(".banner");
    var sliderPage = silderWarp.querySelector(".sliderPage");
    var pageBox = sliderPage.querySelector('div');
    var sliderPreBtn = silderWarp.querySelector(".sliderPrev");
    var sliderNexBtn = silderWarp.querySelector(".sliderNext");
    var bannerUl = banner.querySelector('ul');
    var bannerWidth = banner.offsetWidth;
    var index = 0;
    silderWarp.addEventListener("mouseenter", function() {
        sliderPreBtn.style.display = 'block';
        sliderNexBtn.style.display = 'block';
    })
    silderWarp.addEventListener("mouseleave", function() {
        sliderPreBtn.style.display = 'none';
        sliderNexBtn.style.display = 'none';
    })
    // 轮播图按键prev
    sliderPreBtn.addEventListener("click", function() {
        index--;
        if(index < 0) {
            index = bannerUl.children.length-1;
        }
        bannerUl.style.transform = 'translateX('+ -bannerWidth*index +'px)';
        for(var i = 0; i < pageBox.children.length; i++) {
            pageBox.children[i].className = "";
        }
        pageBox.children[index].classList.add('activeP');
    })
    // 轮播图按键next
    sliderNexBtn.addEventListener("click", function() {
        nextPageActive();
    })
    //轮播图添加页码
    addSliderPage();
    sliderPageActive();
    //定时播放
    window.setInterval(function() {
        nextPageActive();
    }, 5000)
    function nextPageActive() {
        index++;
        if(index == bannerUl.children.length) {
            index = 0;
        }
        bannerUl.style.transform = 'translateX('+ -bannerWidth*index +'px)';
        for(var i = 0; i < pageBox.children.length; i++) {
            pageBox.children[i].className = "";
        }
        pageBox.children[index].classList.add('activeP');
    }
    function sliderPageActive() {
        for(var i = 0; i < pageBox.children.length; i++) {
            pageBox.children[i].addEventListener("mouseenter", function() {
                for(var i = 0; i < pageBox.children.length; i++) {
                    pageBox.children[i].className = "";
                }
                this.classList.add('activeP');
                index = this.getAttribute("data");
                bannerUl.style.transform = 'translateX('+ -bannerWidth*index +'px)';
            })
        }
    }
    function addSliderPage() {
        for(var i = 0; i < bannerUl.children.length; i++) {
            var addA = document.createElement('a');
            addA.innerHTML = i;
            addA.setAttribute("data", i);
            addA.href = "javascript:;";
            pageBox.appendChild(addA);
        }
        pageBox.children[0].classList.add('activeP');
    }
    /* 新歌首发 */
    var newSongList = document.querySelector(".newSongList");
    var menuItem = newSongList.querySelectorAll(".MenuItem");
    var songTabContent = document.querySelector("#songTabContent");
    var songItems = songTabContent.querySelectorAll(".songItems");
    var songItemAs = songTabContent.querySelectorAll("a");
    var songTips = songTabContent.querySelectorAll(".songTips");
    var songIconPlays = songTabContent.querySelectorAll(".icon-play");
    var downloadBtns = songTabContent.querySelectorAll(".downloadBtn");
    songMenuAddIndex();
    //TAB切换事件
    for(var i = 0; i < menuItem.length; i++) {
        menuItem[i].addEventListener("mouseenter", function() {
            for(var i = 0; i <menuItem.length; i++) {
                menuItem[i].classList.remove("active");
            }
            this.classList.add("active");
            songTABNone();
            songTabContent.children[this.getAttribute("index")].style.display = "block";
        })
    }
    for(var i = 0; i < songItems.length; i++) {
        songItems[i].addEventListener("mouseenter", function() {
            var songItemA = this.querySelector("a");
            var songTip = this.querySelector(".songTips");
            var songIconPlay = this.querySelector(".icon-play"); 
            var downloadBtn = this.querySelector(".downloadBtn");
            for(var i = 0; i < songItems.length; i++) {
                songItems[i].classList.remove("active-SongItem");
            }
            for(var i = 0; i < songItemAs.length; i++) {
                songItemAs[i].style.color = "#333";
            }
            if(songTip) {
                for(var i = 0; i <songTips.length; i++) {
                    songTips[i].style.display = "block";
                }
            }
            for(var i = 0; i <songIconPlays.length; i++) {
                songIconPlays[i].style.display = "none";
            }
            for(var i = 0; i <downloadBtns.length; i++) {
                downloadBtns[i].style.display = "none";
            }
            this.classList.add("active-SongItem");
            songItemA.style.color = "#009af3";
            songTip && (songTip.style.display = "none");
            songIconPlay.style.display = "inline-block";
            downloadBtn.style.display = "inline-block";
        })
    }
    function songMenuAddIndex() {
        for(var i = 0; i < menuItem.length; i++) {
            menuItem[i].setAttribute("index", i);
        }
    }
    function songTABNone() {
        for(var i = 0; i < songTabContent.children.length; i++) {
            songTabContent.children[i].style.display = "none";
        }
    }
    // 热门歌手
    var hotSinger = document.querySelector(".HotSinger");
    var tabSpan = hotSinger.querySelector(".tabT").querySelectorAll("span");
    var singerList = hotSinger.querySelectorAll("li");
    singerMenuAddIndex();
    for(var i = 0; i < tabSpan.length; i++) {
        tabSpan[i].addEventListener("mouseenter", function() {
            for(var i = 0; i < tabSpan.length; i++) {
                tabSpan[i].classList.remove("active");
            }
            for(var i = 0; i < singerList.length; i++) {
                singerList[i].style.display = "none";
            }
            this.classList.add("active");
            singerList[this.getAttribute("index")].style.display = "block";
        })
    }
    function singerMenuAddIndex() {
        for(var i = 0; i < tabSpan.length; i++) {
            tabSpan[i].setAttribute("index", i);
        }
    }
    //返回顶部
    var content = document.querySelector(".content");
    var limitHeight = document.querySelector(".limitHeight");
    var contentoffTop = content.offsetTop;
    var limitHeightTop = limitHeight.offsetTop;
    var scrollTop = document.querySelector(".scrollTop");
    scrollTop.style.transition = "all 0.4s"
    scrollTop.addEventListener("click", function() {
        window.scroll(0, 0);
    })
    window.addEventListener("scroll", function(e) {
        if(window.pageYOffset < contentoffTop) {
            scrollTop.style.display = "none";
        } else if(window.pageYOffset < limitHeightTop){
            scrollTop.style.display = "block";
            scrollTop.style.right = "104px";
            scrollTop.style.bottom = "50px";
        } else {
            scrollTop.style.bottom = "50%";
            scrollTop.style.transform = "translateY(-50%)";
        }
    })
})
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const creat__but = $(".creat--but");
const creat = $(".creat");
const creat__league = $(".creat--league");
const form__user1 = $(".form-user1");
const container = $(".container");
const team__in = $(".team--in");
const team__table = $(".team--table");
const team__point = $(".team--point");
const form__submit = $(".form-submit");
const form__submit1 = $(".form-submit1");
const form__user = $(".form-user");
const operating = $(".operating");
const name__league = $(".name--league");
const bxh__wrapper = $(".bxh-wrapper");
const result__bxh = $(".result--bxh");
const result__match = $(".result--match");
const statistical = $(".statistical");
const statisticalCK = $("statisticalCK");

const switch__fields = document.querySelectorAll('input[name="switch-two"]');
const btn = document.querySelector("#btn");
const tournament__name = document.querySelector("#tournament--name");
const teams = document.querySelector("#teams");
const teamIn = document.querySelector("#team--in");
const teamTable = document.querySelector("#team--table");
const win = document.querySelector("#win");
const draw = document.querySelector("#draw");
const lost = document.querySelector("#lost");

const arr = [
  {
    name: "",
    Tournament: "",
    teams,
    teamIn,
    teamTable,
    pointWin: 0,
    pointDraw: 0,
    pointLost: 0,
  },
];
const arr1 = [];
const arr2 = [];
const users = [];

creat__but.onclick = function () {
  container.style.display = "none";
  creat__league.style.display = "block";
};

let selectedSize;
for (const switch__field of switch__fields) {
  switch__field.onclick = function () {
    switch__field.checked = true;
    selectedSize = switch__field.value;
    // chọn hình thức thi đấu nào thì hiện ra lựa chọn của nó
    if (selectedSize == 1) {
      team__in.style.display = "none";
      team__table.style.display = "none";
      team__point.style.display = "none";
      arr[0].Tournament = "1";
    } else if (selectedSize == 2) {
      team__in.style.display = "none";
      team__table.style.display = "none";
      team__point.style.display = "block";
      arr[0].Tournament = "2";
    } else if (selectedSize == 3) {
      team__in.style.display = "block";
      team__table.style.display = "block";
      team__point.style.display = "block";
      arr[0].Tournament = "3";
    }
  };
}

function userRender() {
  // Tính số người chơi
  for (i = 0; i < arr[0].teams; i++) {
    arr1.push("x");
  }

  // render ra bảng nhập tên ng chơi
  const htmls = arr1.map((user, index) => {
    return `
      <div class="user-wra">
        <img
          class="user-avatar"
          src="./img/team.png"
          alt="Avatar"
          tabindex="0"
        />
        <div class="user-inf">
          <label for="fullname" class="form-label">${
            "Người chơi " + (index + 1)
          }</label>
          <input
            id="${"user" + (index + 1)}"
            name="fullname"
            type="text"
            placeholder="VD: Nguyen Van A"
            class="form-control"
          />
        </div>
      </div>
      `;
  });

  form__user.innerHTML = htmls.join("");
}

// render ra phần đầu mỗi bảng
function tableRender() {
  // Số bảng
  // arr[0].teamTable = 1;
  name__league.innerText = arr[0].name;
  if (selectedSize === "2") {
    arr[0].teamTable = 1;
  }
  for (i = 0; i < arr[0].teamTable; i++) {
    if (i == 0) {
      arr2.push("Bảng A");
    } else if (i == 1) {
      arr2.push("Bảng B");
    } else if (i == 2) {
      arr2.push("Bảng C");
    } else if (i == 3) {
      arr2.push("Bảng D");
    } else if (i == 4) {
      arr2.push("Bảng E");
    } else {
      arr2.push("Bảng F");
    }
  }

  const htmls = arr2.map((user, index) => {
    return `
        <div class="bxh-wrapper">
            <div class="bxh--header">${user}</div>
            <div class="bxh">
              <div class="header_bxh">
                <div class="header-name">Đội</div>
                <ul class="bxh_nameValue">
                  <li><a href=""></a>HS</li>
                  <li><a href=""></a>Đ</li>
                </ul>
              </div>

              <div class="bxh--club${index}"></div>     
            </div>
          </div>
        </div>
    `;
  });
  result__bxh.innerHTML = htmls.join("");
}

// render ra phần thân bảng
const tables = [];
function clubRender() {
  // Chia bảng
  let index = 0;
  let index2 = 0;
  var dem = arr[0].teams / arr[0].teamTable;
  for (i = 0; i < arr[0].teamTable; i++) {
    const x = [];
    for (j = 0; j < Math.round(dem); j++) {
      users[index2];
      x.push(users[index2]);
      index2 += 1;
    }
    index += 1;
    tables[`bang_${index}`] = x;
  }

  // Tính thứ tự các đội trên bxh
  for (i = 0; i < arr[0].teamTable; i++) {
    tables[`bang_${i + 1}`].sort(function (a, b) {
      if (b.point == a.point) {
        tables[`bang_${i + 1}`].sort(function (a, b) {
          return b.hs - a.hs;
        });
      }
      return b.point - a.point;
    });
  }

  // render bxh
  const z = ".bxh--club";
  for (i = 0; i < arr[0].teamTable; i++) {
    const bxh__club = $(`${z}${i}`);
    const htmls2 = tables[`bang_${i + 1}`].map((user, index) => {
      if (user != undefined) {
        return `
          <div class="body_bxh">
            <div class="body_bxh--wrapper">
              <div class="bxh_clb">
                <div class="bxh_stt">${index + 1}</div>
                <div class="club_logo">
                  <img src="./img/team.png" alt="" />
                </div>
                <div class="bxh_clbName">${user.name}</div>
              </div>
    
              <div class="bxh_value">
                <li><a href=""></a>${user.hs}</li>
                <li><a href=""></a>${user.point}</li>
              </div>
            </div>
          </div>
        `;
      }
    });
    bxh__club.innerHTML = htmls2.join("");
  }
}

// tính các trận đấu
const matchs = [];
function matchHandler() {
  let soTran = 0;
  for (i = 0; i < arr[0].teamTable; i++) {
    tables[`bang_${i + 1}`].map((user1, index) => {
      tables[`bang_${i + 1}`].map((user2, index) => {
        if (user1 != user2 && user1 != undefined && user2 != undefined) {
          matchs.push({
            home: user1.name,
            away: user2.name,
          });
        }
      });
    });
  }

  const htmls3 = matchs.map((macth, index) => {
    return `
            <div class="match">
              <div class="match--header">Trận ${index + 1}</div>
                <div class="macth--title">
                  <div class="home">
                    <div class="home--name"><p>${macth.home}</p></div>
                    <div class="home--logo">
                      <img src="./img/team.png" alt="" />
                    </div>
                    <input
                      id="home--point${index}"
                      class="form-control mask numeric required"
                      min="0"
                      max="10"
                      required=""
                      name="numCompetitors"
                      type="number"
                      value="0"
                      style="border-color: rgb(220, 228, 236)"
                    />
                  </div>
                  <p>-</p>
                  <div class="away">
                    <input
                      id="away--point${index}"
                      class="form-control mask numeric required"
                      min="0"
                      max="10"
                      required=""
                      name="numCompetitors"
                      type="number"
                      value="0"
                      style="border-color: rgb(220, 228, 236)"
                    />
                    <div class="home--logo">
                      <img src="./img/team.png" alt="" />
                    </div>
                    <div class="home--name"><p>${macth.away}</p></div>
                  </div>
                <button class="form-submit2 form-macth${index}">Cập nhật</button>
              </div>
            </div> 
        `;
  });
  result__match.innerHTML = htmls3.join("");

  const arrStatistical = [];
  const arrStatistical1 = [];
  const arrStatisticalBK = [];
  const arrStatisticalCK = [];
  matchs.map(function (match, index) {
    const form__macth = $(`.form-macth${index}`);
    form__macth.onclick = function () {
      const homePoint = document.querySelector(`#home--point${index}`).value;
      const awayPoint = document.querySelector(`#away--point${index}`).value;
      let pointWin = Number(arr[0].pointWin);
      let pointDraw = Number(arr[0].pointDraw);
      let pointLost = Number(arr[0].pointLost);
      let hsHome = homePoint - awayPoint;
      let hsAway = awayPoint - homePoint;
      let homeName = matchs[index].home;
      let awayName = matchs[index].away;
      for (i = 0; i < arr[0].teamTable; i++) {
        tables[`bang_${i + 1}`].map((user, index) => {
          if (user != undefined) {
            // Tính điểm đội sân nhà rồi render lại bxh
            if (user.name === homeName) {
              if (homePoint > awayPoint) {
                user.point += pointWin;
                user.hs += hsHome;
                clubRender();
              } else if (homePoint == awayPoint) {
                user.point += pointDraw;
                clubRender();
              } else if (homePoint < awayPoint) {
                user.point += pointLost;
                user.hs += hsHome;
                clubRender();
              }
            }

            // Tính điểm đội sân khách rồi render lại bxh
            else if (user.name === awayName) {
              if (homePoint < awayPoint) {
                user.point += pointWin;
                user.hs += hsAway;
                clubRender();
              } else if (homePoint == awayPoint) {
                user.point += pointDraw;
                clubRender();
              } else if (homePoint > awayPoint) {
                user.point += pointLost;
                user.hs += hsAway;
                clubRender();
              }
            }
          }
        });
      }
      form__macth.style.display = "none";
      soTran++;
      if (soTran == matchs.length) {
        let teamIn = Number(arr[0].teamIn);
        for (i = 0; i < arr[0].teamTable; i++) {
          tables[`bang_${i + 1}`].map((user, index) => {
            if (index < teamIn) {
              arrStatistical.push(user.name);
            }
          });
        }
      }

      // Xử lí khi vào vòng loại trực tiếp

      // Bán kết
      if (arrStatistical.length == 4) {
        arrStatisticalBK.push(
          {
            home: arrStatistical[0],
            away: arrStatistical[3],
          },
          {
            home: arrStatistical[1],
            away: arrStatistical[2],
          }
        );

        const htmls4 = arrStatisticalBK.map((macth, index) => {
          return `      
                <div class="match">
                  <div class="match--header">Bán kết ${index + 1}</div>
                    <div class="macth--title">
                      <div class="home">
                        <div class="home--name"><p>${macth.home}</p></div>
                        <div class="home--logo">
                          <img src="./img/team.png" alt="" />
                        </div>
                        <input
                          id="home--pointBK${index}"
                          class="form-control mask numeric required"
                          min="0"
                          max="10"
                          required=""
                          name="numCompetitors"
                          type="number"
                          value="0"
                          style="border-color: rgb(220, 228, 236)"
                        />
                      </div>
                      <p>-</p>
                      <div class="away">
                        <input
                          id="away--pointBK${index}"
                          class="form-control mask numeric required"
                          min="0"
                          max="10"
                          required=""
                          name="numCompetitors"
                          type="number"
                          value="0"
                          style="border-color: rgb(220, 228, 236)"
                        />
                        <div class="home--logo">
                          <img src="./img/team.png" alt="" />
                        </div>
                        <div class="home--name"><p>${macth.away}</p></div>
                      </div>
                      <button class="form-submit2 form-macthBK${index}">
                        Cập nhật
                      </button>
                  </div>
                </div> 
              `;
        });
        statistical.innerHTML = htmls4.join("");

        // Chung kết
        arrStatisticalBK.map(function (match, index) {
          const form__macthBK = $(`.form-macthBK${index}`);
          form__macthBK.onclick = function () {
            const homePointBK = document.querySelector(
              `#home--pointBK${index}`
            ).value;
            const awayPointBK = document.querySelector(
              `#away--pointBK${index}`
            ).value;

            if (homePointBK > awayPointBK) {
              arrStatistical1.push(match.home);
            } else if (homePointBK < awayPointBK) {
              arrStatistical1.push(match.away);
            }
            form__macthBK.style.display = "none";
          };
        });
        if (arrStatistical1.length == 2) {
          arrStatisticalCK.push({
            home: arrStatistical1[0],
            away: arrStatistical1[1],
          });
          console.log(arrStatisticalCK);

          // Chung kết
          const htmls5 = arrStatisticalCK.map((macth, index) => {
            return `
                <h2>Chung Kết</h2>
          <div class="statistical">
          <div class="match">
            <div class="match--header">Chung Kết</div>
              <div class="macth--title">
              <div class="home">
              <div class="home--name"><p>${macth.home}</p></div>
              <div class="home--logo">
              <img src="./img/team.png" alt="" />
              </div>
                  <input
                    id="home--pointCK"
                    class="form-control mask numeric required"
                    min="0"
                    max="10"
                    required=""
                    name="numCompetitors"
                    type="number"
                    value="0"
                    style="border-color: rgb(220, 228, 236)"
                    />
                    </div>
                    <p>-</p>
                    <div class="away">
                    <input
                    id="away--pointCK"
                    class="form-control mask numeric required"
                    min="0"
                    max="10"
                    required=""
                    name="numCompetitors"
                    type="number"
                    value="0"
                    style="border-color: rgb(220, 228, 236)"
                  />
                  <div class="home--logo">
                    <img src="./img/team.png" alt="" />
                    </div>
                    <div class="home--name"><p>${macth.away}</p></div>
                    </div>
                    <button class="form-submit2 form-macthCK">
                  Cập nhật
                </button>
                </div>
                </div>
                </div>
                `;
          });
          statisticalCK.innerHTML = htmls5.join("");
        }
      }
    };
  });
}

form__submit.onclick = function () {
  arr[0].name = tournament__name.value;
  arr[0].teams = teams.value;
  arr[0].teamIn = teamIn.value;
  arr[0].teamTable = teamTable.value;
  arr[0].pointWin = win.value;
  arr[0].pointDraw = draw.value;
  arr[0].pointLost = lost.value;
  creat__league.style.display = "none";
  form__user1.style.display = "block";
  userRender();
  for (i = 0; i < arr[0].teams; i++) {
    users.push({
      index: i,
      id: "user" + (i + 1),
      name: `Đội ${i + 1}`,
      point: 0,
      hs: 0,
    });
  }
};

form__submit1.onclick = function () {
  for (i = 0; i < arr[0].teams; i++) {
    const idUser = document.querySelector("#" + users[i].id);
    if (idUser.value) {
      users[i].name = idUser.value;
    }
  }
  form__user1.style.display = "none";
  operating.style.display = "block";
  tableRender();
  clubRender();
  matchHandler();
};

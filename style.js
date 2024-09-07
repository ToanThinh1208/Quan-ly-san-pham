document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    //tạo biến
    let name = document.querySelector("#name").value;
    let price = document.querySelector("#price").value;
    let amount = document.querySelector("#amount").value;
    let description = document.querySelector("#description").value;
    let linkImg = document.querySelector("#link-img").value;
    //tạo object item từ cái name này
    let item = {
        id: new Date().toISOString(),
        name: name.trim(),
        price: price,
        amount: amount,
        description: description,
        linkImg: linkImg,
    }
    //hiển thị lên UI
    addItemToUI(item);
    //lưu item vào localStorage
    addItemToLS(item);
});

//hàm nhận item và hiển thị lên giao diện
const addItemToUI = (item) => {
    const {id, name, price, linkImg} = item; //phân rã
    //tạo div mới
    let newCard = document.createElement("div");
    newCard.className = `card-item m-3`;
    //thêm phần tử vô
    newCard.innerHTML = `
        <img src="${linkImg}" class="card-img-top" alt="ảnh sản phẩm">
        <div class="card-body" data-id="${id}">
            <div class="name-product">${name}</div>
            <div class="card-text d-flex flex-row justify-content-between h-100">
                <span>${price}$</span>
                <span style="text-decoration: line-through;">${price * 2}$</span>
            </div>
        </div>
    
    `;
    //thêm cái div mới vào div-cardGroup
    document.querySelector(".card-group").appendChild(newCard);
};

//getList
const getList = () => {
    return JSON.parse(localStorage.getItem("cardGroup")) || [];
};

//addItemToLS
const addItemToLS = (item) => {
    //lấy ds từ ls || []
    let cardGroup = getList();
    cardGroup.push(item);
    //lưu
    localStorage.setItem("cardGroup", JSON.stringify(cardGroup)); //ép về JSON và lưu lên lại js
};

//init
const init = () => {
    let cardGroup = getList();
    cardGroup.forEach((item) => {
        addItemToUI(item);
    });
};

init();

//xóa phần từ
const removeItemFromLS = (idRemove) => {
    let cardGroup = getList();
    cardGroup = cardGroup.filter((item) => item.id != idRemove);
    localStorage.setItem("cardGroup", JSON.stringify(cardGroup));
}
//xóa hết
// document.querySelector("#btn-delete").addEventListener("click", (event) => {
//     let isConfirmed = confirm(`Bạn có chắc là muốn xóa hết ?`);
//     if(isConfirmed) {
//         document.querySelector(".card-group").innerHTML= "";
//         localStorage.removeItem("cardGroup");
//     }
// })
//chức năng filter
document.querySelector("#find").addEventListener("keyup", (event) => {
    let inputValue = event.target.value;
    // event.preventDefault();
    // let cardGroup = getList();
    // cardGroup = cardGroup.filter((item) => item.name.includes(inputValue) || item.description.includes(inputValue));
    // document.querySelector(".card-group").innerHTML= "";
    // cardGroup.forEach((item) => {
    //     addItemToUI(item);
    // });
    document.querySelector('.btn-icon-find').addEventListener("click", (event) => {
        event.preventDefault();
        let cardGroup = getList();
        cardGroup = cardGroup.filter((item) => item.name.includes(inputValue) || item.description.includes(inputValue));
        document.querySelector(".card-group").innerHTML= "";
        cardGroup.forEach((item) => {
            addItemToUI(item);
        });

        document.querySelectorAll(".card-item").forEach(card => {
            //kêu tất cả các thg có class card-item đứng đợi
            //có thg nào đc bấm thì làm
            card.addEventListener("click", (event) => {
              event.preventDefault();
                //dom tới cái card-Body từ đó lấy id của nó
              let cardBody = card.querySelector(".card-body");
              let idItem = cardBody.dataset.id;
              let cardGroup = getList();
              //filter lại theo id
              cardGroup = cardGroup.filter((item) => item.id.includes(idItem));
                //phân rã ra để lấy biến
              const {name, price, amount, description, linkImg} = cardGroup[0];
                //chạy tất cả các thg trong form-controll
                document.querySelectorAll(".form-control").forEach((item) => {
                    if(item.id == `name`){
                        item.value = name ;
                    }else if(item.id ==`price`) {
                        item.value = price;
                    }else if(item.id ==`amount`) {
                        item.value = amount;
                    }else if(item.id ==`description`) {
                        item.value = description;
                    }else if(item.id ==`link-img`) {
                        item.value = linkImg;
                    }
                });
                //xóa hết actived của các phần tử
                document.querySelectorAll(".card-item").forEach((_item) => {
                    _item.classList.remove("actived");
                    _item.style.poiterEvent = "none";
                });
                //set actived cho thg mới nhấn
                card.classList.add("actived");
                //xóa item sau khi xem th
                let confirmed = false;
                document.querySelector("#btn-delete").addEventListener("click", (event) => {
                    event.preventDefault();
                    if(!confirmed){
                        if(card.classList.contains("actived")){
                            let isConfirmed = confirm(`Bạn có muốn xóa sản phẩm này ?`);
                            if(isConfirmed){
                                let idRemove = idItem;
                                card.remove();
                                removeItemFromLS(idRemove);
                            }
                        }
                    }
                    confirmed = true;
                });
            });
        });
          
        
    })

});
//innerHTML, context là thêm vào, value là dữ liệu => xóa thì cho nó = ""
//chức năng clear khung thông tin
document.querySelector("#btn-clear").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#name").value= "";
    document.querySelector("#price").value= "";
    document.querySelector("#amount").value= "";
    document.querySelector("#description").value= "";
    document.querySelector("#link-img").value= "";
    location.reload();
})

//show thông tin
document.querySelectorAll(".card-item").forEach(card => {
    //kêu tất cả các thg có class card-item đứng đợi
    //có thg nào đc bấm thì làm
    card.addEventListener("click", (event) => {
      event.preventDefault();
        //dom tới cái card-Body từ đó lấy id của nó
      let cardBody = card.querySelector(".card-body");
      let idItem = cardBody.dataset.id;
      let cardGroup = getList();
      //filter lại theo id
      cardGroup = cardGroup.filter((item) => item.id.includes(idItem));
        //phân rã ra để lấy biến
      const {name, price, amount, description, linkImg} = cardGroup[0];
        //chạy tất cả các thg trong form-controll
        document.querySelectorAll(".form-control").forEach((item) => {
            if(item.id == `name`){
                item.value = name ;
            }else if(item.id ==`price`) {
                item.value = price;
            }else if(item.id ==`amount`) {
                item.value = amount;
            }else if(item.id ==`description`) {
                item.value = description;
            }else if(item.id ==`link-img`) {
                item.value = linkImg;
            }
        });
        //xóa hết actived của các phần tử
        document.querySelectorAll(".card-item").forEach((_item) => {
            _item.classList.remove("actived");
            _item.style.poiterEvent = "none";
        });
        //set actived cho thg mới nhấn
        card.classList.add("actived");
        //xóa item sau khi xem th
        let confirmed = false;
        document.querySelector("#btn-delete").addEventListener("click", (event) => {
            event.preventDefault();
            if(!confirmed){
                if(card.classList.contains("actived")){
                    let isConfirmed = confirm(`Bạn có muốn xóa sản phẩm này ?`);
                    if(isConfirmed){
                        let idRemove = idItem;
                        card.remove();
                        removeItemFromLS(idRemove);
                    }
                }
            }
            confirmed = true;
        });
    });
});
  

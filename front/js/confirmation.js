function findOrderId(){
    const urlObj=new URL(window.location.href);
    const orderId=urlObj.searchParams.get("id");
    console.log(orderId);

    const orderIdConfirm=document.querySelector("#orderId");
    orderIdConfirm.innerHTML = orderId;

    }

findOrderId();

function LuckyForm(){
    swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        html: 'เราจะทำการส่งของไปตามข้อมูลที่กรอกไว้',
        timer: 1800,
        showConfirmButton: false
    }).then(function(){
        document.location.href = "https://www.fivefrogsix.com/"
    })
}
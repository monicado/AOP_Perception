PennController.DebugOff();
PennController.ResetPrefix(null);
PreloadZip("https://mondo1.dreamhosters.com/AOP_AllObjects_Transparent.zip");

Sequence("InclusionCriteria", "Consent", "Instructions", "Counter", "CheckPreload",
"Block1", "break",
"Block2", "break",
"Block3", "break",
"Block4", "break",
"Block5", "break",
"Block6", "break",
"Block7", "break",
"Block8", SendResults(),"EndScreen")

// Preface
newTrial("InclusionCriteria",
    newCanvas("Age", 600, 200)
    .add("center at 50%", 0,
      newText("18years", "Bạn đủ 18 tuổi trở lên?")
      .css("font-size", "24px")
      .css("font-weight", "bold"))
    .add("center at 25%", "middle at 50%",
      newButton("Yes", "Có")
      .css("font-size", "24px"))
    .add("center at 75%", "middle at 50%",
      newButton("No", "Không")
      .css("font-size", "24px"))
    .center()
    .print()
    ,
    newSelector("AgeSelector")
    .add(getButton("Yes"), getButton("No"))
    .wait()
    .log("all")
    .remove()
    ,
    getCanvas("Age")
    .remove()
    ,
    newCanvas("NativeVietnamese", 600, 200)
    .add("center at 50%", 0,
      newText("Vietnamese", "Tiếng Việt có phải là tiếng mẹ đẻ của bạn không?")
      .css("font-size", "24px")
      .css("font-weight", "bold"))
    .add("center at 25%", "middle at 50%",
      getButton("Yes", "Có")
      .css("font-size", "24px"))
    .add("center at 75%", "middle at 50%",
      getButton("No", "Không")
      .css("font-size", "24px"))
    .center()
    .print()
    ,
    newSelector("NativeLanguageSelector")
    .add(getButton("Yes"), getButton("No"))
    .wait()
    .log("all")
    .remove()
    ,
    getCanvas("NativeVietnamese")
    .remove()
    ,
    newText("Residency", "Vui lòng liệt kê những quốc gia mà bạn đã sống trong 7 năm gần đây.")
    .print()
    ,
    newTextInput("ResidencyInput")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    .log()
    ,
    newText("OtherLanguages", "Nếu bạn thường xuyên sử dụng những ngôn ngữ khác ngoài tiếng Việt, xin bạn vui lòng liệt kê các ngôn ngữ này. Dùng dấu ngoặc ( ) để ghi chú lượng thời gian (theo %) mà bạn sử dụng các ngôn ngữ ngày trong một ngày điển hình (ví dụ: tiếng Hoa (15%), tiếng Anh (5%)).")
    .print()
    ,
    newTextInput("OtherLangInput")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    .log()
    ,
    newButton("Làm Tiếp")
    .center()
    .print()
    .wait()
    .remove()
  ).setOption("hideProgressBar",true);

newTrial("Consent",
    newText("InfoSheet","<p><b>Trường Đại Học Chicago – Đơn đồng thuận tham gia khảo sát trực tuyến</b></p><p><b>Khảo sát số:</b> IRB20-1213</p><p><b>Tiêu đề khảo sát:</b> Cách thức sử dụng ngôn ngữ</p>  <p><b>Người thực hiện khảo sát:</b> Giáo sư Monica Do</p> <p><b>Mô tả:</b> Chúng tôi là các nhà nghiên cứu thuộc trường Đại Học Chicago. Chúng tôi đang tiến hành một cuộc nghiên cứu nhằm tìm hiểu cách thức chúng ta xử lý, hiểu, và sử dụng ngôn ngữ. Bạn là một trong những ứng viên cho cuộc khảo sát này vì tiếng mẹ đẻ của bạn là tiếng Việt và bạn trên 18 tuổi. Nếu bạn tình nguyện tham gia vào cuộc khảo sát này, bạn sẽ được yêu cầu làm một số việc như sau: Bạn sẽ đọc hoặc nghe một số câu văn và trả lời câu hỏi về nội dung của chúng. Bạn cũng có thể được yêu cầu nói hoặc viết, hoặc thực hiện các bài tập liên quan đến việc sử dụng ngôn ngữ. Với sự đồng ý của bạn, phần trình bày của bạn sẽ được ghi âm lại. Tổng thời gian của cuộc khảo sát vào khoảng 20-30 phút. Sự tham gia của bạn là hoàn toàn tự nguyện.</p> <p><b>Quyền lợi:</b> Bạn sẽ được nhận $6.00 sau khi hoàn tất cuộc khảo sát. Vì Amazon MTurk không cho phép tính theo tỷ lệ hoàn tất nên nếu bạn gặp phải trục trặc và không nộp bài làm được (lỗi khi nhấn “Submit HIT”), bạn phải liên lạc với ban nghiên cứu để chúng tôi xem xét thù lao cho phần bài mà bạn đã hoàn tất.</p> <p><b>LƯU Ý:</b> Cuộc khảo sát này có kèm theo phần kiểm tra sự tập trung của người tham gia để đảm bảo việc mọi người hoàn tất các câu hỏi một cách trung thực và đầy đủ. Miễn là bạn đọc hướng dẫn và hoàn tất các câu hỏi, bài làm (HIT) của bạn sẽ được chấp nhận. Nếu bạn không vượt qua được các mốc kiểm tra, bài làm của bạn sẽ bị từ chối.</p> <p><b>Rủi ro và lợi ích:</b> Không có rủi ro nào được ghi nhận về phương pháp khảo sát này. Không có lợi ích trực tiếp nào mà bạn có thể nhận được khi tham gia cuộc khảo sát này. Thông tin mà chúng tôi thu thập trong cuộc khảo sát sẽ được dùng để tìm hiểu các nhân tố ảnh hưởng đến việc sử dụng ngôn ngữ.</p> <p><b>Bảo mật:</b> Tài khoản MTurk của bạn sẽ được dùng để chuyển thù lao nhưng sẽ không được lưu lại trong dữ liệu khảo sát mà chúng tôi thu thập. Vui lòng lưu ý rằng tài khoản MTurk của bạn có thể được kết nối với trang thông tin của bạn trong tài khoản Amazon (Amazon public profile page), tùy thuộc vào chế độ cài đặt mà bạn chọn lựa cho tài khoản Amazon của mình. Chúng tôi sẽ không truy cập bất kỳ thông tin cá nhân nào trên trang thông tin Amazon của bạn. Các câu trả lời mà bạn cung cấp trong bài khảo sát sẽ được thu thập dưới hình thức ẩn danh. Thông tin này có thể được sử dụng hoặc chia sẻ với các nghiên cứu khác trong tương lai mà không cần xác nhận thêm về sự đồng thuận của bạn. Nếu bạn quyết định rút khỏi cuộc khảo sát này, toàn bộ thông tin bạn đã cung cấp sẽ bị hủy bỏ.</p> <p><b>Liên hệ và thắc mắc:</b> Nếu bạn có bất kỳ câu hỏi hay lo ngại nào về cuộc khảo sát này, xin vui lòng liên hệ Giáo sư Monica Do bằng email tại địa chỉ monicado@uchicago.edu hoặc qua số điện thoại (773) 834-1988. </p> <p>Nếu bạn có thắc mắc gì về quyền hạn của người tham gia khảo sát, cảm thấy mình đã bị tổn hại, hoặc muốn trao đổi các vấn đề liên quan đến cuộc khảo sát này với một người khác không thuộc ban nghiên cứu, bạn có thể liên hệ với University of Chicago Social & Behavioral Sciences Institutional Review Board (IRB) Office qua số điện thoại (773) 702-2915, hoặc bằng email tại địa chỉ sbs-irb@uchicago.edu.</p> <p><b>Đồng thuận:</b> Việc bạn tham gia cuộc khảo sát này là hoàn toàn tự nguyện. Từ chối hay rút lui đều không bị xử phạt hoặc dẫn đến việc mất đi những quyền lợi mà lẽ ra bạn phải được hưởng.</p> <p>Nếu bạn <b>chọn “Tôi đồng ý”</b>, bạn xác nhận rằng mình đã đọc đơn đồng thuận này, rằng bạn trên 18 tuổi, và bạn đồng ý tham gia cuộc khảo sát.</p><p>Nếu bạn <b>chọn “Tôi KHÔNG đồng ý”</b>, bạn sẽ không tham gia vào cuộc khảo sát này. Bạn sẽ thấy một màn hình hiển thị giúp bạn thoát ra. </p> <p>Cám ơn bạn đã quan tâm đến cuộc khảo sát của chúng tôi. Xin bạn vui lòng in hoặc lưu lại một bản sao của trang này cho cá nhân mình.</p>")
    .print()
    ,
    newCanvas("Consent", 800, 200)
    .add("center at 25%", 0, newButton("Agree", "Tôi đồng ý").css("font-size", "18px"))
    .add("center at 75%", 0, newButton("Disagree", "Tôi KHÔNG đồng ý").css("font-size", "18px"))
    .center()
    .print()
    ,
    newSelector("ConsentSelect")
    .add(getButton("Agree"), getButton("Disagree"))
    .log("all")
    .wait()
    .test.selected(getButton("Agree"))
    .success(
        getText("InfoSheet")
        .remove()
        ,
        getSelector("ConsentSelect")
        .remove()
        ,
        getCanvas("Consent")
        .remove()
        )
    .failure(
        getText("InfoSheet")
        .remove()
        ,
        getSelector("ConsentSelect")
        .remove()
        ,
        getCanvas("Consent")
        .remove()
        ,
        newText("Exit", "Xin bạn vui lòng đóng trang hiển thị này để thoát ra. Cám ơn bạn đã quan tâm đến cuộc khảo sát của chúng tôi.")
        .center()
        .css("font-size", "18px")
        .print()
        .wait()
        )
).setOption("hideProgressBar",true);

newTrial("Instructions",
    newText("InstructHeader", "HƯỚNG DẪN")
    .center()
    .bold()
    .css("font-size", "24px")
    .print()
    ,
    newText("instruct","<p>1. Mỗi câu khảo sát sẽ bắt đầu với một bức ảnh. Bạn hãy cố hết sức để ghi nhớ hình ảnh đó.</p> <p>2. Sau đó, bạn sẽ thấy một vài phép toán đơn giản. Hãy giải chúng nhanh hết mức có thể.</p><p>3. Khi bạn giải xong các phép toán đó, bạn sẽ thấy bức ảnh thứ hai hiện ra. Bạn hãy chọn “Có” nếu bức ảnh này <i>giống hệt</i> như bức ảnh đầu tiên bạn thấy. Nếu không, hãy chọn “Không”.</p><p>Nếu bạn không chắc nên chọn thế nào, hãy chọn theo suy đoán tốt nhất của mình. Bạn sẽ có vài lần nghỉ giải lao ngắn trong suốt quá trình làm khảo sát.</p>")
    .center()
    .css("font-size", "18px")
    .print()
    ,
    newButton("Begin Experiment", "Bắt đầu cuộc khảo sát")
    .center()
    .print()
    .wait()
    .remove()
).setOption("hideProgressBar",true);

SetCounter("Counter", "inc", 1)

CheckPreloaded(5*60*1000)
.label("CheckPreload")

const replacePreloadingMessage = ()=>{
    const preloadingMessage = $(".PennController-PennController > div");
    if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
        preloadingMessage.html("Xin bạn vui lòng chờ ít phút để chương trình khảo sát được hiển thị.");
    window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );

// MAIN EXPERIMENT
newTrial("break", newButton("Làm Tiếp").print().wait() )

Template(
    GetTable("AOR_PerceptionMemory_OneByOneList.csv")
    .setGroupColumn( "ListID" )
    ,
    row => newTrial("Block"+row.BlockID
    ,
    newImage("OGImage",row.OGFile)
    .size(960, 540)
    .center()
    .print()
    ,
    newTimer("ImageDuration",2000)
    .start()
    .wait()
    ,
    getImage("OGImage")
    .remove()
    ,
    newText("Equation1", row.Equation1)
    .center()
    .css("font-size", "48px")
    .print()
    ,
    newTextInput("Box1")
    .once()
    .center()
    .print()
    .wait()
    .log("final")
    ,
    getText("Equation1")
    .remove()
    ,
    getTextInput("Box1")
    .remove()
    ,
    newText("Equation2", row.Equation2)
    .center()
    .css("font-size", "48px")
    .print()
    ,
    newTextInput("Box2")
    .once()
    .center()
    .print()
    .wait()
    .log("final")
    ,
    getText("Equation2")
    .remove()
    ,
    getTextInput("Box2")
    .remove()
    ,
    newText("Equation3", row.Equation3)
    .center()
    .css("font-size", "48px")
    .print()
    ,
    newTextInput("Box3")
    .once()
    .center()
    .print()
    .wait()
    .log("final")
    ,
    getText("Equation3")
    .remove()
    ,
    getTextInput("Box3")
    .remove()
    ,
    newImage("ChangeImage",row.ChangeFile)
    .size(960, 540)
    .center()
    .print()
    ,
    newCanvas("Prompt", 600, 200)
    .center()
    .add("center at 50%", 0,
      newText("PromptText", "Bức ảnh này có giống y hệt như bức ảnh bạn đã thấy không?")
      .css("font-size", "24px"))
    .add("center at 25%","middle at 50%", getButton("Yes"))
    .add("center at 75%","middle at 50%", getButton("No"))
    .print()
    ,
    getSelector("YesNoSelector")
    .add(getButton("Yes"), getButton("No"))
    .log("all")
    .wait()
    .remove()
)
  .log("List", row.ListID)
  .log("ItemNumb", row.ItemNumb)
  .log("ItemID", row.OGItemID)
  .log("ChangeID", row.ChangeItemID)
  .log("Condition", row.ChangeType)
);


 // END THANK YOU
 newTrial("EndScreen",
     newText("Thanks", "Rất cám ơn bạn đã tham gia cuộc khảo sát này! Nếu bạn có bất kỳ thắc mắc gì, xin bạn vui lòng liên hệ Giáo sư Monica Do tại địa chỉ monicado@uchicago.edu.<p>Bạn hãy nhập mã này để nhận thù lao: <b>####</b></p>")
     .print()
     .center()
     .css("font-size", "36px")
     ,
     newButton("void")
     .wait()
 ).setOption("hideProgressBar",true);        // The progress bar should not be visible for this trial;        // The progress bar should not be visible for this trial

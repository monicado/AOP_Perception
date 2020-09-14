PennController.DebugOff();
PennController.ResetPrefix(null);
PennController.PreloadZip("https://mondo1.dreamhosters.com/AOP_AllObjects_Transparent.zip");

Sequence("Consent", "Counter", "Instructions",
"PreloadImages",
"Block1","break",
"Block2", "break",
"Block3", "break",
"Block4", "break",
"Block5", "break",
"Block6", "break",
"Block7", "break",
"Block8", SendResults(),"EndScreen")

// Preface
newTrial("Consent",
    newText("InclusionCriteria", "<b>You must be at least 18 years of age & a native speaker of American English to participate in this study.</b>"
    .center()
    .css({"font-size": "36px"})
    .print()
    ,
    newImage("Consent","https://mondo1.dreamhosters.com/MTurkOnlineConsent_English_45mins.jpg")
    .settings.size(794, 1123)
    .print()
    .center()
    ,
    newCanvas("agree", 800, 400)
    .add(200, 0, newButton("Agree", "I agree"))
    .add(400, 0, newButton("Disagree", "I do NOT agree"))
    .center()
    .print()
    ,
    newSelector("consentselect")
    .add(getButton("Agree"), getButton("Disagree"))
    .settings.log("all")
    .wait()
    ,
    getSelector("consentselect")
    .test.selected(getButton("Agree"))
    .success(
        getImage("Consent")
        .remove()
        ,
        getSelector("consentselect")
        .remove()
        ,
        getCanvas("agree")
        .remove()
        )
    .failure(
        getImage("Consent")
        .remove()
        ,
        getSelector("consentselect")
        .remove()
        ,
        getCanvas("agree")
        .remove()
        ,
        newText("Exit", "You may exit the experiment by closing the window. Thank you for your consideration.")
        .print()
        .center()
        .css({"font-size": "24px"})
        .wait()
        )
).setOption("hideProgressBar",true);

newTrial("Instructions",
    newText("InstructHeader", "INSTRUCTIONS")
    .center()
    .bold()
    .css({"font-size": "24px"})
    .print()
    ,
    newText("instruct","<p>1. Each trial in this experiment will start with an image. Remember that image as best you can.</p> <p>2. Afterwards, you will see some simple math problems. Solve those as quickly as you can.</p><p>3. When you complete those, you will be shown a second image. Select <b>Yes</b> if the second image is <i>exactly</i> the same as the first, and <b>No</b> otherwise.</p><p>If you aren't sure about anything, just take your best guess! You will be given a few short breaks at different points in the study.</p>")
    .center()
    .print()
    ,
    newButton("Begin Experiment")
    .settings.center()
    .print()
    .wait()
    .remove()
    ,
    getText("InstructHeader")
    .remove()
    ,
    getText("instruct")
    .remove()
).setOption("hideProgressBar",true);

SetCounter("Counter", "inc", 1)

PennController.CheckPreloaded(5*60*1000) // wait up to 5 minutes for preload
    .label("PreloadImages")

const replacePreloadingMessage = ()=>{
    const preloadingMessage = $(".PennController-PennController > div");
    if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
        preloadingMessage.html("<p>Please wait while the experiment is loading. This may take a few minutes.</p>");
    window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );

// MAIN EXPERIMENT
newTrial("break", newButton("Start next set").print().wait() )

PennController.Template(
    GetTable("AOR_PerceptionMemory_OneByOneList.csv")
    .setGroupColumn( "ListID" )
    ,
    row => newTrial("Block"+row.BlockID
    ,
    newImage("OGImage",row.OGFile)
    .settings.size(960, 540)
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
    .css({"font-size": "48px"})
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
    .css({"font-size": "48px"})
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
    .css({"font-size": "48px"})
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
    .settings.size(960, 540)
    .print()
    ,
    newText("Prompt", "Is this image exactly the same as the one you saw before?")
    .center()
    .bold()
    .print()
    .css({"font-size": "24px"})
    ,
    newCanvas("sidebyside", 960, 200)
    .add(400,0, newButton("yes", "Yes"))
    .add(560,0, newButton("no", "No"))
    .settings.center()
    .print()
    ,
    newSelector("yesno")
    .settings.add( getButton("yes"), getButton("no"))
    .settings.log("all")
    .wait()
    ,
    getImage("ChangeImage")
    .remove()
    ,
    getCanvas("sidebyside")
    .remove()
    ,
    getText("Prompt")
    .remove()
)
  .log( "List" , row.ListID)
  .log("ItemNumb", row.ItemNumb)
  .log("ItemID", row.OGItemID)
  .log("ChangeID", row.ChangeItemID)
  .log( "Condition", row.ChangeType)
);

PennController.SendResults();


 // END THANK YOU
 newTrial("EndScreen",
     newText("<p>Thank you for your participation! If you have questions about this research you may contact the researcher Dr. Monica Do at monicado@uchicago.edu.</p><p><b>Please enter the following code on mturk to receive credit: 846305628 </b></p>")
         .print()
         .center()
     ,
     newButton("void")
         .wait()
 ).setOption("hideProgressBar",true);        // The progress bar should not be visible for this trial;        // The progress bar should not be visible for this trial

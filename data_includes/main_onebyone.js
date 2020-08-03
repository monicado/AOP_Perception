//PennController.DebugOff();
PennController.ResetPrefix(null);
PennController.PreloadZip("https://mondo1.dreamhosters.com/AOR_PerceptionMemory_StimImages.zip");

Sequence("Consent", "Counter", "Instructions",
"Block1","break",
"Block2", "break",
"Block3", "break",
"Block4", SendResults(),"EndScreen")

// Preface
newTrial("Consent",
    newText("Consent",
    "<p>This study is being conducted by the Language Processing Lab at the University of Chicago.</p><p>You are invited to complete this experiment because you are an adult (18 years or older) and you are native speaker of American English (you learned English from birth and are a fluent speaker of English).</p><p>You may withdraw from this study at any time without penalty. However, make sure you have a reliable internet connection and are able to complete the study in one sitting as too many missed trials can affect payment.</p><p><b>This study takes approximately 30 minutes</b> and you will be paid $[[--]] for your participation.</p><p>By entering your MTurk, you agree that you are <b>at least 18 years of age, that you are a native speaker of American English, and that you understand these instructions and conditions of participation.</b></p>")
    .center()
    .print()
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
        getText("Consent")
        .remove()
        ,
        getSelector("consentselect")
        .remove()
        ,
        getCanvas("agree")
        .remove()
        )
    .failure(
        getText("Consent")
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
    newText("instruct","<p>1. Each trial in this experiment will start with a sequence of numbers. Remember those numbers in order as best you can.</p> <p>2. Afterwards, you will be shown two images. Your job it to decide whether the second image you see is <i>exactly</i> the same as the first. Select <b>Yes</b> if the images were <i>exactly</i> the same, and <b>No</b> otherwise.</p><p>3. After you make your selection, you will be asked to type the numbers you saw into a box.</p><p>If you can't remember the numbers or if you can't remember the images, just take your best guess! You will be given the opportunity to take a short break at 4 different points in the study.</p>")
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

// MAIN EXPERIMENT
newTrial("break", newButton("Start next set").print().wait() )

PennController.Template(
    GetTable("AOR_PerceptionMemory_IbexList.csv")
    .setGroupColumn( "ListID" )
    ,
    row => newTrial("Block"+row.BlockID
    ,
    newText("Numbers", row.Numbers)
    .center()
    .css({"font-size": "48px"})
    .print()
    ,
    newTimer("Timer", 2000)
    .start()
    .wait()
    ,
    getText("Numbers")
    .remove()
    ,
    newImage("OGImage",row.OGFile)
    .settings.size(960, 540)
    .print()
    ,
    newTimer("ImageDuration",1000)
    .start()
    .wait()
    ,
    getImage("OGImage")
    .remove()
    ,
    newTimer("InterImage", 500)
    .start()
    .wait()
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
    ,
    newText("EnterNumb", "Press <b>Enter</b> when you have finished entering the numbers.")
    .print()
    .center()
    ,
    newTextInput("Repeat")
    .once()
    .center()
    .print()
    .wait()
    .log("final")
    ,
    getTextInput("Repeat")
    .remove()
    ,
    getText("EnterNumb")
    .remove()
  )
  .log( "List" , row.ListID)
  .log("ItemNumb", row.ItemNumb)
  .log("ItemID", row.OGItemID)
  .log( "Condition", row.ChangeType)
);

PennController.SendResults();


 // END THANK YOU
 newTrial("EndScreen",
     newText("<p>Thank you for your participation! If you have questions about this research you may contact the researcher Dr. Monica Do at monicado@uchicago.edu.</p><p><b>Please enter the following code on mturk to receive credit: 82442240 </b></p>")
         .print()
     ,
     newButton("void")
         .wait()
 ).setOption("hideProgressBar",true);        // The progress bar should not be visible for this trial;        // The progress bar should not be visible for this trial

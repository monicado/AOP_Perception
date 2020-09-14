//PennController.DebugOff();
PennController.ResetPrefix(null);
PennController.PreloadZip("https://mondo1.dreamhosters.com/AOR_PerceptionMemory_StimImages.zip");

Sequence("Consent", "Counter", "Instructions",
"ItemNumb1", "ItemNumb2", "ItemNumb3", "ItemNumb4", "break",
"ItemNumb5", "ItemNumb6", "ItemNumb7", "ItemNumb8", "break",
"ItemNumb9", "ItemNumb10", "ItemNumb11", "ItemNumb12", "break",
"ItemNumb13", "ItemNumb14", "ItemNumb15", "ItemNumb16",
SendResults(),"EndScreen")

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
newTrial("break", newButton("Continue").print().wait() )

PennController.Template(
    GetTable("AOR_PerceptionMemory_NumbersList.csv")
    ,
    row => newTrial(row.ItemNumb
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
    )
);

newTrial("EnterNumb",
  newText("NumbInstruct", "Press <b>Enter</b> when you have finished entering the numbers.")
  .print()
  .center()
  ,
  newTextInput("NumbRepeat")
  .once()
  .center()
  .print()
  .wait()
  .log("final")
  ,
  getTextInput("NumbRepeat")
  .remove()
  ,
  getText("NumbInstruct")
  .remove()
)

PennController.Template(
    GetTable("AOR_PerceptionMemory_BlockedList.csv")
    .setGroupColumn( "ListID" )
    ,
    row => newTrial("ItemNumb"+row.ItemNumb
    ,
    newImage("OG1",row.OG1)
    .settings.size(960, 540)
    .print()
    ,
    newTimer("ImageDuration",1000)
    .start()
    .wait()
    ,
    getImage("OG1")
    .remove()
    ,
    newTimer("InterImage", 500)
    .start()
    .wait()
    ,
    newImage("OG2",row.OG2)
    .settings.size(960, 540)
    .print()
    ,
    getTimer("ImageDuration")
    .start()
    .wait()
    ,
    getImage("OG2")
    .remove()
    ,
    getTimer("InterImage")
    .start()
    .wait()
    ,
    newImage("OG3",row.OG3)
    .settings.size(960, 540)
    .print()
    ,
    newTimer("ImageDuration",1000)
    .start()
    .wait()
    ,
    getImage("OG3")
    .remove()
    ,
    getTimer("InterImage")
    .start()
    .wait()
    ,
    newImage("OG4",row.OG4)
    .settings.size(960, 540)
    .print()
    ,
    newTimer("ImageDuration",1000)
    .start()
    .wait()
    ,
    getImage("OG4")
    .remove()
    ,
    newText("ChangeInstruct","You're going to see the images in order again.")
    .print()
    .center()
    ,
    newTimer("InstructTimer", 1000)
    .start()
    .wait()
    ,
    getText("ChangeInstruct")
    .remove()
    ,
    newImage("Change1",row.Change1)
    .settings.size(960, 540)
    .print()
    ,
    newCanvas("SelectionCanvas", 960, 200)
    .add(0,0, newText("Prompt", "Is this image exactly the same as the one you saw before?")
                .center()
                .bold()
                .print()
                .css({"font-size": "24px"})
        )
    .add(400, 30, newButton("yes", "Yes"))
    .add(560, 30, newButton("no", "No"))
    .settings.center()
    .print()
    ,
    newSelector("yesno")
    .settings.add( getButton("yes"), getButton("no"))
    .settings.log("all")
    .wait()
    ,
    getImage("Change1")
    .remove()
    ,
    getCanvas("SelectionCanvas")
    .remove()
    ,
    newImage("Change2",row.Change2)
    .settings.size(960, 540)
    .print()
    ,
    getCanvas("SelectionCanvas")
    .print()
    ,
    newSelector("yesno")
    .settings.add( getButton("yes"), getButton("no"))
    .settings.log("all")
    .wait()
    ,
    getImage("Change2")
    .remove()
    ,
    getCanvas("SelectionCanvas")
    .remove()
    ,
    newImage("Change3",row.Change3)
    .settings.size(960, 540)
    .print()
    ,
    getCanvas("SelectionCanvas")
    .print()
    ,
    newSelector("yesno")
    .settings.add( getButton("yes"), getButton("no"))
    .settings.log("all")
    .wait()
    ,
    getImage("Change3")
    .remove()
    ,
    getCanvas("SelectionCanvas")
    .remove()
    ,
    newImage("Change4",row.Change4)
    .settings.size(960, 540)
    .print()
    ,
    getCanvas("SelectionCanvas")
    .print()
    ,
    newSelector("yesno")
    .settings.add( getButton("yes"), getButton("no"))
    .settings.log("all")
    .wait()
    ,
    getImage("Change4")
    .remove()
    ,
    getCanvas("SelectionCanvas")
    .remove()
    )
  .log( "List" , row.ListID)
  .log("ItemNumb", row.ItemNumb)
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

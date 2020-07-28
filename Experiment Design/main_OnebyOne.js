//AOR_PerceptionMemory_BlockedVersion
//PennController.DebugOff();
PennController.ResetPrefix(null);
PennController.PreloadZip("https://mondo1.dreamhosters.com/AOR_PerceptionMemory_StimImages.zip");

Sequence("Consent", "Counter", "Instructions","Block1","EndScreen")

// Preface
newTrial("Consent",
    newText("Consent",
    "<p>This study is being conducted by the Language Processing Lab at the University of Chicago.</p><p>You are invited to complete this experiment because you are an adult (18 years or older) and you are native speaker of American English (you learned English from birth and are a fluent speaker of English).</p><p>You may withdraw from this study at any time without penalty. However, make sure you have a reliable internet connection and are able to complete the study in one sitting as too many missed trials can affect payment.</p><p><b>This study takes approximately 30 minutes</b> and you will be paid $[[--]] for your participation.</p><p>By entering your MTurk, you agree that you are <b>at least 18 years of age, that you are a native speaker of American English, and that you understand these instructions and conditions of participation.</b></p>")
        .print()
    ,
    newText("IDenter","<p>Enter your MTurk ID.</p>")
        .settings.center()
        .print()
    ,
    newTextInput("ID")
        .settings.center()
        .print()
    ,
    newVar("ID")
    .global()
    .set( getTextInput("ID") )
    ,
    newButton("GoToInstruct", "Continue")
    .settings.center()
    .print()
    .wait()
    .remove()
    ,
    getText("IDenter")
    .remove()
    ,
    getTextInput("ID")
    .remove()
    ,
    getText("Consent")
    .remove()
)

newTrial("Instructions",
    newText("instruct","<p>In this experiment, you will see several pairs of images. Your job is to determine if the images match</p>")   // Enter Instructions for the experiment here
    .print()
    ,
    newButton("Begin Experiment")
    .settings.center()
    .print()
    .wait()
    .remove()
    ,
    getText("instruct")
    .remove()
);

SetCounter("Counter", "inc", 1)

// MAIN EXPERIMENT
newTrial("break" , newButton("Start next set").print().wait() )

PennController.Template(
    GetTable("AOR_PerceptionMemory_IbexList.csv")
    .setGroupColumn( "ListID" )
    ,
                        row => newTrial("Block"+row.BlockID,
  newImage("OGImage",row.OGFile)
  .settings.size(960, 540)
  .print()
  ,
  newTimer("ImageDuration",3000)
  .start()
  .wait()
  ,
  getImage("OGImage")
  .remove()
  ,
  newImage("ChangeImage",row.ChangeFile)
  .settings.size(960, 540)
  .print()
  ,
  newText("Prompt", "Is this image exactly the same as the one you saw before?")
  .settings.center()
  .print()
  ,
  newCanvas("sidebyside", 820, 400)
  .settings.add(365, 0, newButton("yes", "Yes"))
  .settings.add(430, 0, newButton("no", "No"))
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
  .log( "ID" , getVar("ID") )
  .log( "List" , row.ListID)
  .log("ItemNumb", row.ItemNumb)
  .log("ItemID", row.OGItemID)
  .log( "Condition", row.ChangeType)
);


 // END THANK YOU
 newTrial("EndScreen",
     newText("<p>Thank you for your participation! If you have questions about this research, or if you would like to receive a report of this research when it is completed, you may contact the researcher Monica Do at monicado@uchicago.edu.</p><p><b>Please enter the following code on mturk to receive credit: 82442240 </b></p>")
         .print()
     ,
     newButton("void")
         .wait()
 ).setOption("hideProgressBar",true);        // The progress bar should not be visible for this trial;        // The progress bar should not be visible for this trial

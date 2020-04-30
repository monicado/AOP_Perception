//PennController.DebugOff();
PennController.ResetPrefix(null);
PennController.PreloadZip("https://mondo1.dreamhosters.com/testimages.zip");
SetCounter("inc", 1);

// PREFACE PAGE
PennController(
  newText("consent", "<p>You have been invited to take part in a research study conducted by the University of Chicago.</p><p>You are being asked to complete this experiment because you are an adult (18 years or older) and you are native speaker of American English (you learned English from birth and are a fluent speaker of English).</p><p>You may withdraw from this study at any time without penalty. However, make sure you have a reliable internet connection and are able to complete the study in one sitting as too many missed trials can affect payment.</p><p>If you have questions about this research, or if you would like to receive a report of this research when it is completed, please contact the researchers at .</p><p><b>This study takes approximately 30 minutes</b> and you will be paid $5 for your participation.</p>")
  .print()
  ,
  newText("IDenter","<p>By entering your MTurk ID, you agree that you are <b>at least 18 years of age, that you are a native speaker of American English, and that you understand these instructions and conditions of participation.</b></p>")
  .settings.center()
  .print()
  ,
  newTextInput("ID")
  .print()
  .settings.center()
  .settings.log("final")
  ,
  newVar("ID")
  .settings.global()
  .set( getTextInput("ID") )
  ,
  newButton("I agree")
  .settings.center()
  .print()
  .wait()
  .remove()
  ,
  getText("consent")
  .remove()
  ,
  getText("IDenter")
  .remove()
  ,
  getTextInput("ID")
  .remove()
);


// INSTRUCTIONS & EXAMPLES PAGE
PennController(
  newText("Instructions","<p><b>Experiment works best in Firefox. It is not compatible with Safari.</b><p>In this experiment, you will see several sets of images, your job is to remember each image as best you can.</p> <p>When you see the images the second time, your job is to decide if the image shown is <b><i>exactly</i> the same</b> as the one you saw before.</p>")
  .settings.center()
  .print()
  ,
  newButton("ShowExample", "See Sample Image")
  .settings.center()
  .print()
  .wait()
  .remove()
  ,
  getText("Instructions")
  .remove()
  ,
  newImage("ExampleStill", "Slide1.jpeg")
  .settings.size(680, 500)
  .settings.center()
  .print()
  ,
  newTimer("ShowImageTimer",2000)
  .start()
  .wait()
  ,
  getImage("ExampleStill")
  .remove()
  ,
  newTimer("ExampleTimer", 1000)
  .start()
  .wait()
  ,
  getImage("ExampleStill")
  .print()
  ,
  newText("Prompt", "Is this video exactly the same as the one you saw before?")
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
  getImage("ExampleStill")
  .remove()
  ,
  getCanvas("sidebyside")
  .remove()
  ,
  getText("Prompt")
  .remove()
  ,
  newButton("StartExperiment","Continue to Experiment")
  .settings.center()
  .print()
  .wait()
  .remove()
  );


  // MAIN EXPERIMENT
  Sequence("Block1", "break", "Block2", "break", "Block3")

  newTrial("break" , newButton("Start next set").print().wait() )

  PennController.Template("test.csv",
                          row => newTrial("Block"+row.Block,
    newImage("OGImage",row.OGImage)
    .settings.size(680, 500)
    .print()
    ,
    newTimer("ImageDuration",2000)
    .start()
    .wait()
    ,
    getImage("OGImage")
    .remove()
    )
  );

  PennController.Template("test.csv",
                          row => newTrial("Block"+row.Block,
    newImage("ChangeImage",row.ChangeImage)
    .settings.size(680, 500)
    .print()
    ,
    newText("Prompt", "Is this video exactly the same as the one you saw before?")
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
  );


   // END THANK YOU
   PennController(
       newText("<p>Thank you for your participation! Please enter the following code on mturk to receive credit: 82442240 </p>")
           .print()
       ,
       newButton("void")
           .wait()
   ).setOption("hideProgressBar",true);        // The progress bar should not be visible for this trial;        // The progress bar should not be visible for this trial

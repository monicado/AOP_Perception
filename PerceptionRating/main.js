//PennController.DebugOff();
PennController.ResetPrefix(null);

Sequence("Consent", "Counter", "Instructions","Example", "Experiment", SendResults(), "EndScreen")

newTrial("Consent",
    newText("InclusionCriteria", "<b>You must be at least 18 years of age & a native speaker of American English to participate in this study.</b>")
    .center()
    .css({"font-size": "36px"})
    .print()
    ,
    newImage("Consent","https://mondo1.dreamhosters.com/MTurkOnlineConsent_English_30mins.jpg")
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
).setOption("hideProgressBar",true)

SetCounter("Counter", "inc", 1)

newTrial("Instructions",
    defaultText
      .center()
      .print()
    ,
    newText("InstructHeader", "INSTRUCTIONS")
      .center()
      .bold()
      .css({"font-size": "24px"})
      .print()
    ,
    newText("<p>In this experiment, you will have to use a slider to indicate which of two options you think sounds more natural. Try not to overthink any of your answers and just go with your intuition. </p>")
    ,
    newText("Once you have finished indicating your preference, you can press <strong>Continue</strong> to move forward to the next trial.")
    ,
    newCanvas(100, 25)
        .print()
    ,
    newButton("Continue", "Continue")
        .center()
        .print()
        .wait()
)

newTrial("Example",
    newText("For example, when presented with the two options below, if you think the phrase 'open and close' sounds more natural than 'close and open', you would drag the slider to the left, like this:")
        .print()
        .center()
    ,
    newImage("Leftpref", "Leftpreference.png")
        .print()
        .center()
    ,
    newText("<p>If you think the phrase 'close and open' sounds more natural, you would place the slider closer to the right, like this:</p>")
        .print()
        .center()
    ,
    newImage("Rightpref", "Rightpreference.png")
        .print()
        .center()
    ,
    newText("<p>If you don't have a strong preference between the two, you would leave the slider somewhere in the center, like this:</p>")
        .print()
        .center()
    ,
    newImage("Nopref", "Nopreference.png")
        .print()
        .center()
    ,
    newText("<p>Please press the button below when you are ready to begin the experiment.</p>")
        .print()
        .center()
    ,
    newButton("Continue2", "Continue to Experiment")
        .center()
        .print()
        .wait()
)

Template(
  GetTable("AOP_PerceptionRatings_ItemsList.csv")
        .setGroupColumn("ListID")
    ,
    variable => newTrial("Experiment",
    newText("Which description sounds more natural?")
        .center()
        .print()
        .bold()
    ,
    newScale("slider",100)
        .slider()
        .center()
        .settings.before(newText("Left", variable.PhraseLeft))
        .settings.before(newCanvas(50, 25))
        .settings.after(newCanvas(50, 25))
        .settings.after(newText("Right", variable.PhraseRight))
        .print()
        .log()
    ,
    newCanvas(100,25)
        .print()
    ,
    newText("<p>Adjust the slider to indicate your preference</p>")
        .center()
        .print()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
)
.log("Left", variable.PhraseLeft)
.log("Right", variable.PhraseRight)
.log("ItemType", variable.ItemType)
.log("ListID", variable.ListID)
.log("ItemID", variable.ItemID)
.log("ConditionID", variable.ConditionID)
.log("WordID", variable.WordID)
.log("AdjFar", variable.AdjFar)
.log("AdjClose", variable.AdjClose)
)

PennController.SendResults();


 // END THANK YOU
 newTrial("EndScreen",
     newText("<p>Thank you for your participation! If you have questions about this research you may contact the researcher Dr. Monica Do at monicado@uchicago.edu.</p><p><b>Please enter the following code on mturk to receive credit: 74067305 </b></p>")
         .print()
         .center()
     ,
     newButton("void")
         .wait()
 ).setOption("hideProgressBar",true);        // The progress bar should not be visible for this trial;        // The progress bar should not be visible for this trial

window.loc = 
  intro:
    content: """
      This morning I saw the café waitress curse an overbearing logger. It's a blessing few people know real curses. Anyone who's been cursed wouldn't wish one on their worst enemies. I know I wouldn't.
    
      [Dark Passenger](#sprawling-mansion)

      by Jethro Larson
    """
  #######
  'sprawling-mansion': 
    content: """
      After a [long walk](#sprawling-mansion_long-walk) up the nastiest dirt road I've ever seen I finally arrive at the Smith/McCaskill family [homestead](#sprawling-mansion_detail).

      [Hiro](#hiro) is sitting on the bent armrest of the [porch couch](#sprawling-mansion_couch).
    """
    "long-walk":
      content: """
        I almost wish I'd accepted the ride from Billy at the store. At least his three-wheeler could have dropped me off where the road became completely impassible, provided I survive the ride, of course.
      """
      className: 'aside'
    "detail":
      content: """
        If there was a <em>Lifestyles of the Broke and Obscure</em> this place would be the season finale. 

        The marriage of [Hiro](#hiro) McCaskill and Crystyl Smith ended a four-generation feud. To celebrate the families moved their five trailers to Hobble Ridge where they would share water rights over Bolt Creek. The result resembles a mobile home destruction derby infested with feral animals.

        The trailer amalgamation is cut down the middle, with various cutting tools piled around the split. I guess the divorce proceedings are finally underway.
      """
      className: 'aside'
    "couch":
      content:"""
        A porch couch is the decrepit husk of a former living room couch that has been exposed to the elements. And by elements I mean 5 filthy dogs and El Niño. The dogs are strangely absent today.
      """
      className: 'aside'

  hiro:
    content: """
      Hiro's nephew woke me late last night, pounding on my door and saying his cousin, Jessica had been [possessed](#hiro_possession) and went on a rampage. The [bloody rag](#hiro_examination) on Hiro's neck tells me his daughter's freakout was extraordinary.
    """
    report:
      content: """

      """
    possession: 
      content: """
        Coming here is like stepping into a world where the renaissance never happened. Any illness that can't be healed with alcohol, pot, or the contents under the sink is clearly the work of evil spirits. The last "possession" I had to deal with turned out to be shingles. 
      """
      className: 'aside'
    examination:
      content: """
        "How you holding up?" I ask.
        
        "Worse'n Jess, I hope".

        "Considering how you look, I hope so too." Hiro is swaying from side to side. It's taking all his attention to keep his pain under control. "How's the [wound](#hiro_askwound)?" I ask.

        
      """
    askwound:
      content:"""
        "Super," Hiro says. A pained, exhausted look crosses his face as he glances toward the rag. The blood has a [yellowish tinge](#hiro_tinge).
      """
    tinge: 
      content: """
        "Is that iodine?", I ask, stepping a little closer.

        "No. I put some [moonshine](#hiro_possession) on it but that just made it worse. Taking some orally had better results", Hiro says.

        <%if(!get('closerlook')){%>
          [Take a closer look](#hiro_closerlook)
        <%}%>
      """
    closerlook:
      content:"""
        Hiro pulls the rag off the wound. I cringe at the fist sized area of his neck that's just meat, and not good meat. It's like some kind of abominable afterbirth, veiny and raw. It's actively weeping the [iodine colored fluid](#hiro_wound).
      """
      callback:->
        set 'closerlook'
    wound: 
      content: """
        "It wont stop bleeding," Hiro says.

        <i>"Sweet, the [yellowing](#hiro_wound_jin)! He'll be lots of fun tonight."</i>, [Jin](#jin) says

        "Oh? What happens then?" I ask.

        Hiro gives me a confused look. I keep forgetting that no one else can hear [Jin](#jin).
        "I guess eventually I'll die," Hiro says.

        Jin laughs in my head.
      """
      jin: 
        content: """
          "What is this yellowing? How do I cure him?" I mutter under my breath hoping only [Jin](#jin) will hear.
          
          <i>I don't <b>do</b> cures but I think the [stick](#stick_intro) might tell you some way to get rid of it.</i>

          
        """
        yellowing2:
          content: """
            "So what is the yellowing really called? I don't want to play 20 questions with the damn stick."

            <i>"You're no fun. It's called <b>The Creeping Dream</b>, a lovely curse that grows a malevolent tumor."</i>

          "I don't suppose you mean *malignant*."

          <i>Nope, and when it gets big enough it'll try to escape. I'm guessing you don't want that as much as I do.</i>
          """
      sample: 
        content: """
          
          
          I pull a vial from my satchel and collect some of the yellowish fluid.

          <i>What do you think you're going to do with that?</i>
          
          "I'm not really sure at the moment. It could just be pus, but I don't have the tools to be sure."
        """
  stick:
    content: """
      <%cache._Stick = "stick";%>
      It's a strange snake-shaped artifact I found in the shell of a burnt camper shell. At the time I thought it was weird that a pyrex lantern had melted but a whittled stick was fine. It makes sense to me now.
      
      I ask about...
      [The cure to The Creeping Dream](#<%if(!cache.dream_asked){%>stick_<%}%>creeping-dream)
    """
    intro:
      content: """
        I pull the talking stick from my satchel. It's wrapped in an anti-static bag I got from the computer guy at the school -- the only thing that's managed to stop the itching. [Hiro](#stick_askhiro) looks at it with interest.
        """
    askhiro: """
      "I don't suppose you have a clue what's happening, Hiro?"
      
      Hiro shakes his head.

      My hands are trembling as I [unwind the rubber band](#stick)  holding the bag shut.
    """
    callback: ->
      set 'stick_on'
    # This is the first question you can ask so I'm including more description here than I will on future questions.
    'creeping-dream': 
      content: """
        I hold the stick in front of me and turn it's lightly carved face to look back into my eyes. It immediately turns into a inky black viper, wrapping it's tail around my wrist. It lurches up toward my face it's fangs exposed. Every nerve in my body screams in panic but somehow I resist. It looks me straight in the eye.

        "How do I cure The Creeping Dream?" I ask. It blinks once at me and suddenly is a stick in my hand again. I start to [remember](#stick_creeping-dream_answer).
      """
      answer:
        content:"""
          I start to remember what the stick knows. I put the scattered and nonsensical pieces back together like a fleeting dream. And like a dream I can't know if I'm [remembering it](#creeping-dream) right.

        """
  jin: 
    content: """
      I got Jin kicked out of his last home and so he's staying with me. It turns out exorcism is harder than it looks.
    """
    className: 'aside'
  'creeping-dream':
    content: """
      <%cache._Curse = "creeping-dream";%>
      The Creeping Dream is a <%if(cache.parasite){%> curse <%}else{%> [curse](#creeping-dream_curse) <%}%> caused by a powerful <%if(cache.mara){%>Mara, a chaotic spirit that causes nightmares<%}else{%>[Mara](#creeping-dream_mara)<%}%>.
      
      <%if(cache.parasite){%>
        The parasites can be destroyed by shaming the host while they're in water.

        The curse itself is attached to some object that the afflicted loves. Break that love and then destroy the item with fire.
      <%}%>
    """
    mara:
      content: """
      <%cache.mara = true;%>
      A Mara is a chaotic spirit that causes nightmares.
    """
    curse: 
      content: """
      <%cache.parasite = true;%>
      The curse causes the afflicted to attack all sentient creatures. Bites from the cursed infect targets with spiritual parasites that transform parts of their bodies into hosts for imps.

      The curse itself is attached to a physical object that the host loves, to break it you must make the host no longer love the object then destroy it with fire.
    """

  'living-room': 
    content: """
      The morning sun gave me hope that today would be warm, but there's no 
      comfort to be found in this little farm house. <%if(cache.whispers){%>
      [Whispers](#living-room_whispers)<%}else{%>Whispers<%}%> blow through the 
      house but the air is still, hanging with a 
      [thick stench](#living-room_smell).
      
      A hazy beam of bluish light shines from the 
      [open window](#living-room_shutters) on the [wreckage](#living-room_wreckage) of 
      last night's incident.
    """
    shutters: 
      content: """ 
        The shutters have been thrown wide to let in the morning light but in 
        here the sun shines as through smoked glass, shadows flicking as 
        if cast by some unseen candle.
      """
    wreckage:
      content: """
        Straw mats, tables, pillows, and dishes are strewn about the living room. 
        "What a mess." I look around the chaos. "I'm guessing this
        started at dinner time?"
      
        "Yes. Just before sunset yesterday." <b>Hiro</b> answers.
      """
    smell:
      content: """
        The house reeks of blood, sweat, and rot. There's a hint of some 
        incense that's tried to fight it, but it's losing the battle.
      """
    whispers:
      content: """
        Harsh whispers hiss from behind a [blanket](#living-room_blanket) that has been hung on a doorway. 

        I can't make out what they're saying. Whatever it is, it definately isn't nice.
      """
    blanket: 
      content: """
        I step toward the door and reach toward the blanket.
        <% cache.father_in_living_room = "true";%>
      """
  billy:
    content:"""
      Billy was grossly overweight, dirty, and had the kind of independence that only comes from years of government assistance. I'd sewn up a gash on his leg last week. He had wrecked his 3 wheeler jumping it out of the bed of a lifted pickup. Today he was wearing shorts again and it looked like he pulled out his own stitches. 

      Some people are accident prone, Billy was safety impaired. 
    """
    className: 'aside'

### unused crap below
bedroom:
  content: """
    The family sleeps together in this small room. There's bedrolls on the floor, and writings hanging on the wall, presumably from some religious text.

    There's a portrait on the wall of some ancestor, it's very old. The painting seems to look at you.
    EXAMINE shows close up and VIEW BACK option. The back shows the back of the person. There is otherwise nothing special.

    There's a small table on one side of the room. On it is some incense that you can pick up. DP says he hates jasmine as you pick it up. Obove the table is a mirror facing the door. EXAMINE Shows the reflection. In it is a strange doll with a damaged arm. You can grab the doll through the mirror.
  """
  'support-beam': 
    title: "Support Beam"
    content: """ 
      There's a central support where the girl is tied.

      There are scratches around the base of the pole where the girl has been
      trying to get free and blood has soaked into the wood.
    """
    hiro: 
      content: """ 
        Hiro: 
        So?
        
        BILL
        Huh?
        
        Hiro:
        Can you help her?
        The little girl's clothes are shredded. Her sleves are caked in dirt and blood. She's growling and screeching in tongues. has crazy eyes, jagged teeth and sharpened claws.
      """
    girl: 
      content: """
        "Let me get a closer look." I say. I approach and bend down.
        I'd seen people go crazy before so I'm not too worried. She seems 
        [pretty calm](?q=examine-girl) at the moment.
      """
    'examine-girl': 
      content: """
        I reach toward her. Zoom to her face. Her eyes go crazy. She looses a hand and claws at Bill, scratching the back of his hand.

        Bill jumps back, grabs his hand. The Hiro: dives on the girls arm ad manages to retie it.

        DARK PASSENGER(DP)
        HAHAHAHA! I told you this wasn't mundane.

        BILL
        Insanity doesn't mean she's possessed. We haven't ruled out rabies.

        Hiro:
        What are rabies?

        BILL
        It's a ailment caused by...animal bites.

        DP
        You're going to want sake.

        BILL
        Why? It's not even noon yet

        DP
        For your hand.

        BILL
        It's just a scratch--
        We see POV of his hand, a little black bubble is there.

        Bill pokes it and it erupts with a hundred black baby spiders. They pour down his arm and fall to the floor in a mess if tiny webs. He screams and tries to shake them off. The girl screeches with evil laughter.

        BILL
        Sake! Please!

        Hiro dashes out of the room. Comes back with a ceramic bottle and unstops it. Bill takes a big chug and chokes.

        DP
        No, on your hand, moron.

        Bill pours a bunch on his wound and winces at sting.

        DP
        Though I don't mind the sake.

        After a few seconds of heavy breathing he takes another swig from the bottle, then sighs. The spiders have disappeared.

        BILL
        Alright, you have my...attention.

        DP
        Well, look around, we don't know anything about this spirit yet.
      """

Hiro sways slowly from side to side. It is apparently taking all his attention to keep his pain under control. I hope I can do something for him soon.
        The bloody rag is still bright with fresh blood.
        Jin thinks "[the yellowing](#hiro_wound_jin)" has started, whatever that means.


Jin is the kind of friend that whispers evil shit in your ear, makes you weak, insecure, and summons swarms of black flies for fun. Also he lives inside me.

I used to be an aggressive atheist, as if shooting down other's beliefs made their lives better. Here people start drawing guns if you tell them that bigfoot is a myth. So I played around their insanity to keep the peace. 

It turns out that exorcism is harder than it looks.
###
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'

export default function Workshop() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className='workshop-info'>
          <h1>
          Fog Rot: Chrono-Cartography Workshop:
          </h1>
          <img src='/images/workshop1.jpg' alt="workshop image">
          </img>
          <p>Why do we imagine what we say we imagine? As part of the &apos;Fog Rot&apos; public programme, we will be hosting a &apos;chrono-cartography&apos; workshop exploring themes of forgetting, remembering, ambiguity, and futurity, through a collective imagination activity. Inspired by indie roleplaying games and techniques, the workshop will use group drawing and worldbuilding of abstract timelines to reflect on what emerges when we try to conceptualise the future.

             We will use drawing to additively build up an abstract grid of related temporalities that conceptualise a past, present and future derived from the realities of our own, to collective reflect on our imaginative tendencies to address what is at stake.

             The workshop will feature invited guest participants in the form of artists Johanna de Verdier and Kitty Clark as well as writer and publisher Jamie Sutcliffe, to enrich the conversation and contextualise how relevant themes and stakes emerge within their practices. We feel that their work speaks to the themes and concerns of the workshop and exhibition as a whole and are excited to expand our understanding of practices that respond to the pressing discourses of this age!
          </p>
          
        </div>
        <div className='workshop-info guest'>
          <div className='guestCard'>
            <img src='/images/Jamie Sutcliffe/jamiesutcliffe.jpg' alt='image'></img>
            <div>
              <h3>Jamie Sutcliffe</h3>
              <p>Jamie Sutcliffe is a writer, curator, and co-director of Strange Attractor Press. His work explores artistic encounters with science fictive fabulation, the politics of video games, animation and its entanglements with developments in the life sciences, and the persistence of myth in digital contexts. 
                 He is the editor of the books Documents of Contemporary Art: Magic, published by The Whitechapel Gallery and The MIT Press (2021), and Weeb Theory (2023) published by Banner Repeater, and his essays, reviews, and interviews have been published internationally by Art Monthly, Art Review, e-flux Criticism, Frieze, The White Review, Rhizome, The Quietus, and Bricks From The Kiln amongst others. He has delivered talks, chaired symposia, and hosted interviews with artists at many institutions including Tate Britain, Whitechapel Gallery, The V&A, Wysing Art Centre, Jerwood Space, Somerset House, Sadie Coles HQ, Camden Art Centre, The Photographer&apos;s Gallery, and Focal Point.
              </p>
              <a href='https://strangeattractor.co.uk/' target="_blank" rel="noopener noreferrer">
                <img src='/images/Jamie Sutcliffe/strangeattractorpress.jpg' alt='image'></img>
                Webiste
              </a>
              <FontAwesomeIcon icon={faLink} />
            </div>
          </div>

          <div className='guestCard'>
            <img src='/images/KittyClark/kitty4.jpeg' alt='image'></img>
            <div>
              <h3>Kitty Clark</h3>
              <p>Kitty Clark graduated from the Slade School of Fine Art 2011, and lives and works in Hastings and London. 


                Clark&apos;s practice moves between sculpture and digital media, with many of the works using atypical narrative structures to explore speculative, and frequently dystopian, futures. Themes of escapism and desire, fantasy, science fiction and the esoteric are drawn upon, portrayed with an aesthetic of crooked cartoonish minimalism. Frequently her work utilises devices and structures found in gaming, from choose-your-own-adventure books to text based RPGs. 


                Select recent exhibitions and commissions include: A Haunting, Dinner Party Gallery, London, (2022), Trouble in Outer Heaven, Southwark Park Galleries, London (2021), Ghosts and Apparitions, Sheffield Doc/Fest, 2020, BBC New Creatives with the ICA, London (2019), Solo Presentations, Jerwood Arts, London (2019), Spiders Web is a Stage for A Play, Fungus Press Commission, Turf Projects, London (2018).

              </p>
              <a href='https://kitty-clark.com/' target="_blank" rel="noopener noreferrer">
                Webiste
              </a>
              <FontAwesomeIcon icon={faLink} />
              
            </div>
          </div>

          <div className='guestCard'>
            <img src='/images/Johanna De Verdier/3.jpg' alt='image'></img>
            <div>
              <h3>Johanna De Verdier</h3>
              <p>Johanna de Verdier is an artist working primarily across sculpture, installation and performance often along with computational, sensory components. By looking into the possibilities of self-sufficient ways of living she explores the consequences of extractive industries and what the resurgence of local and rural knowledge might look like in a world that has already gone through climate collapse. 

                Her work often takes shape as tools, backpacks and instruments - a practical array of vessels and instruments for biological survival in post-apocalyptic scenarios. Drawing inspiration from makeshift building structures, preppers, folklore, magic and feminist technoculture Johanna's practice takes a speculative approach to the idea of the apocalypse, linking “the end” to utopian politics, ecology and collectivity.

              </p>
              <a href='https://johannadeverdier.com/' target="_blank" rel="noopener noreferrer">
                Webiste
              </a>
              <FontAwesomeIcon icon={faLink} />
            </div>
          </div>


        </div>
        
      </div>
      <div className='sideBar'>
        <p>Location: GO5, St James Hatcham Church, Goldsmiths

           Time: 2-4pm, Saturday 27th April 

        </p>
        <a href='https://www.eventbrite.co.uk/e/fog-rot-chrono-cartography-workshop-tickets-885496232067' target="_blank" rel="noopener noreferrer">Event Link</a>
        <p>*please note that the workshop will run for two hours and participants are expected to stay for its entire duration*
</p>
      </div>
    </main>
  )
}

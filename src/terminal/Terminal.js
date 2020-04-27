import React, { Component } from 'react'
import './terminal.css'

class Terminal extends Component {
  state = {
    dragging: false,
    top: 0,
    left: 0,
    command: '',
    terminalText: '',
    cursor: true
  }

  prompt = '$> '
  terminal = React.createRef()
  terminalBody = React.createRef()
  cursor = React.createRef()

  close = () => {

  }

  toggleWidth = () => {

  }

  blinkCursor = () => this.setState({
    cursor: !this.state.cursor,
    timeout: setTimeout(this.blinkCursor, 400)
  })

  stopCursor = () => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: null,
      cursor: true
    })
  }

  startDrag = ({ clientX, clientY }) => this.setState({
    dragging: true,
    startX: clientX,
    startY: clientY
  })

  drag = ({ clientX, clientY }) => {
    const { top, left, startX, startY, dragging } = this.state

    if (!dragging) return

    this.setState({
      top: top + clientY - startY,
      left: left + clientX - startX,
      startX: clientX,
      startY: clientY
    })
  }

  endDrag = () => this.setState({ dragging: false })

  handleInput = ({ key }) => {
    let ignoreKeys = [
      'Meta',
      'Alt',
      'Shift',
      'Control',
      'Escape',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    if (key == 'Backspace') {
      this.setState({ command: this.state.command.slice(0, -1) })
    } else if (key == 'Enter') {
      this.handleCommand(this.state.command)
      this.setState({ command: '' })
    } else if (ignoreKeys.includes(key)) {
      return
    } else {
      this.setState({ command: this.state.command + key })
    }
  }

  handleCommand = command => {
    let output

    switch(command) {
      case 'ls':
        output = `
I'm a Graduate student and a software engineer based in New York City with a passion for technology. 

I work mainly in the web development industry, though I have worked on Core Data Platforms, Analytics 
and ML - Recommender Systems in my current and past internships.

My current favorite languages are Python, JavaScript, Lua as it offers a functional programming 
paradigm with a syntax which is domain friendly.`
        break
      case 'cd skills':
        output = `
LANGUAGES        FRAMEWORKS        DATABASE        OTHER

Python           ReactJS           Postgres        AWS
JavaScript       Django            MySQL           Heroku
C++              Flutter           MongoDB         Git
C
Java
PHP                                           
`
        break
      case 'cd music':
        output = `
Genres           FAV BANDS         

Orchestra        Schubert, Bach, Vivaldi, Strauss, Grieg, Andrea Bocelli
Rock             Pink Floyd, ACDC, Winger, White Snake, Deep Purple
Metal            Dream Theater
Death Metal      Opeth, Ghost, Slayer, Slipknot, Machine Head

My playlist is on spotify as: https://open.spotify.com/playlist/2T8XbdsP3CKIUgTldqLNOl
`

        break
      case 'cd projects':
        output = `
OSSP    Lane_finder     Weather_web     CAP

Command 'cd <project_name>' into any one of these projects to view a detailed description about them.
`
        break
      case 'ls -a':
        output = `
projects
skills
music           
contact`

      break
    case 'cd contact':
      output = `
  GitHub: https://github.com/Abezzam10
  Twitter: https://twitter.com/anirudhdas97         
`
      break
    case 'cd Lane_finder':
      output = `
This is a cool project I had worked on to detect road signs and street lanes in a moving vehicle. 
The primary intuition was to highlight lanes so that the vehicle could allign its position according 
to the width of the road. 

Though I did not entirely work on the vehicle positioning, I enjoyed building out the lane detection 
pattern and trained the model rigorously to identify key elements that could boost the experience 
of autonomous vehicles.

Here's a brief overview to highlight my work and the tech stack I used:

• Built an advanced lane-detection system with Python and OpenCV using edge-detection and gradient thresholding
• Enhanced pipeline with Keras with state-of-the-art deep learning architecture boosting accuracy by 80%
• Optimized model overcoming environmental changes such as shadows in real-time videos during driving by 20%
• Utilized: Python, TensorFlow, Keras, Spark ML, OpenCV, SQL        
`
  break
    case 'cd Weather_web':
      output = `
     
An interesting project I had worked on to hone my skills in web and full stack development. 
The functionality of this website is to provide a real-time update of the weather and to promt users 
as to what they should be aware of when stepping out of the house.

Here's a brief overview to highlight my work and the tech stack I used:

• Developed an interactive full-stack website application to detect current weather based on the user's location
• Boosted portal traffic by 70% by designing a lucid, user-friendly interface in JavaScript for submitting requests
• Incorporated client-side features and minimized server-side validations thereby improving performance by 25%
• Utilized: JavaScript, NodeJS, Express, Ajax, REST APIs, Git/GitHub, HTML5, CSS3, MongoDB
`
  break
    case 'cd OSSP':
      output = `

A microservice based app to connect users with businesses and provide a SASS based multiplatform. 
This is different from other in market competitors in that the cost of delivery and operation 
is spread fairly amongst the consumers with each order. The software platform supports business 
administration of merchandise and information and consumer registration. This project is meant to be a 
platform for developers to find and independently choose the tools necessary to build out operational 
services for local businesses.

Here's a brief overview to highlight my work and the tech stack I used:

• Devised, tested Microservices carrying app and business logic resulting in extended scalability of features by 85%
• Directed Docker configurations for Microservices, database, API to achieve consistency in packaging software
• Utilized: Kotlin, Java, NodeJS, Python, Flask, Express, Gradle, Docker, GitHub, Travis CI, Swagger Docs
`
  break
    case 'cd CAP':
      output = `

This is one of my projects where I have designed an e-commerce website using OOP's concepts. Backend was written in 
Python and I used JS styling for frontend.

Here's a brief overview to highlight my work and the tech stack I used:

• Crafted an identity management system for e-commerce web applications based on products, goods, cost
• Built internal multi-platform data exchange automation to ease use prioritization of products and quantity by 30%
• Utilized: Python, ColdFusion, HTML, JavaScript, XML
`
        break
      default:
        output = `Command '${command}' not recognized.`
    }

    this.write(`\n${this.prompt}${command}\n${output}`)
  }

  write = text => {
    this.setState({ terminalText: this.state.terminalText + text + '\n'})
    this.terminalBody.current.scrollTop = this.terminalBody.current.scrollHeight
  }

  componentDidMount() {
    this.terminal.current.focus()
    this.write(`
Welcome to my website. Type one of the following commands to explore:

COMMAND         DESCRIPTION

ls              outputs a short blurb about me
ls -a           shows the contents within this terminal
cd projects     projects that I have worked on
cd skills       lists languages and skills that I have learnt am learning
cd music        gives a brief description of my taste in muisic
cd contact      my contact information
    `)
  }

  render() {
    return (
      <div
        className="terminal"
        ref={ this.terminal }
        onKeyDown={ this.handleInput }
        onFocus={ this.blinkCursor }
        onBlur={ this.stopCursor }
        tabIndex="0"
        style={{
          top: this.state.top,
          left: this.state.left
      }}>
        <div
          className="toolbar"
          onMouseDown={ this.startDrag }
          onMouseMove={ this.drag }
          onMouseUp={ this.endDrag }
          style={{
            cursor: this.state.dragging ? 'grabbing' : 'grab',
        }}>
          <div className="buttonContainer">
            <button onClick={ this.close } className="close"/>
            <button onClick={ this.toggleWidth } className="toggle"/>
          </div>

          <p>./anirudhdas97.sh</p>
        </div>
        <div className="body" ref={ this.terminalBody }>
          <pre>{ this.state.terminalText }</pre>
          <p className="prompt">
            { this.prompt }
            { this.state.command }
            <span
              className="cursor"
              ref={ this.cursor }
              style={{ display: this.state.cursor ? 'inline-block' : 'none' }}
            />
          </p>
        </div>
      </div>
    )
  }
}

export default Terminal


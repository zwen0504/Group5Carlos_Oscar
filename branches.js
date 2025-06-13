//Circles class storing information of each ball
class Circles {

  constructor(starterXPos, starterYPos, starterDiameter, colorTop, colorBottom){
    this.ballXPos = starterXPos
    this.ballYPos = starterYPos
    this.ballDiameter = starterDiameter

    //store original positions for oscillation
    this.originalX = starterXPos
    this.originalY = starterYPos
  
    //for dropping animation
    this.targetY = img.height - img.height/5.5 //base level of drawing
    this.dropSpeed = 0
    this.gravity = 0.3

    //stored random colors with min/max of browns for trunk
    this.colorTop = colorTop ?? color(random(80, 100), random(50, 70), random(40, 50));
    this.colorBottom = colorBottom ?? color(random(120, 150), random(80, 100), random(50, 80));

    this.StrokeColor = color(0)
    this.StrokeWeight = 0
  }
  

  //generate trunk function, logic
  generateTrunk() {
    const segments = 3
    let y = this.ballYPos 
    let x = this.ballXPos
    let prevD = this.ballDiameter
    
    //push initial ball
    balls.push(this)

    //logic to keep balls connected
    for (let i=0; i<segments; i++){
      let newD = Math.round(random(10, 80))
      //change y pos of next ball by radius of previous ball + new ball
      y -= (prevD/2 + newD/2) 
      balls.push(new Circles(x, y, newD))
      prevD = newD
  
    }
  }

  generateBranches() {
    const start = balls[balls.length - 1]; // Top of the trunk
    const numBranches = 4;
    const angleOffsets = [-PI/6, -PI/3, -TWO_PI/3, -(5*PI)/6]; // Direction spread

    let seasonColors 
    
    if (useCherryBlossom){
     seasonColors = [
      [color(255, 182, 193), color(255, 105, 180)], //pink
      [color(255, 182, 193), color(255, 105, 180)],
      [color(255, 182, 193), color(255, 105, 180)],
      [color(255, 182, 193), color(255, 105, 180)]
      ];
      } else {
      seasonColors = [
      [color(120, 255, 120), color(80, 200, 80)], // Spring 
      [color(255, 230, 100), color(255, 180, 60)],  // Summer 
      [color(255, 100, 0), color(150, 30, 0)],   // Autumn 
      [color(120, 180, 255), color(60, 120, 200)]  // Winter 
      ]
      }

    for (let i = 0; i < numBranches; i++) {
        this.growBranch(start.ballXPos, start.ballYPos, 6, angleOffsets[i], seasonColors[i]);
      }
    }

  growBranch(x, y, segments, angle, colorPair) {

    let prevD = random(10, 60);

    //Starting colours for the base of the branches
    let baseTop = color(random(80, 100), random(50, 70), random(40, 50))
    let baseBottom = color(random(120, 150), random(80, 100), random(50, 80))

    for (let i = 0; i < segments; i++) {
      let newD = random(10, 60);

      let lerpAmt = sqrt(i / segments) //stronger gradient transition to colours
       // Calculate the color for this segment based on progress
      let t = i / (segments - 1); // progress from 0 to 1
      let interpolatedTop = lerpColor(baseTop, colorPair[0], lerpAmt);    // start from brown -> seasonal colour
      let interpolatedBottom = lerpColor(baseBottom, colorPair[1], lerpAmt); 

      // Move in direction of angle
      x += cos(angle) * (prevD / 2 + newD / 2);
      y += sin(angle) * (prevD / 2 + newD / 2);

      let jitter = random(-PI / 10, PI / 10);
      angle += jitter; // create a wiggly path

      balls.push(new Circles(x, y, newD, interpolatedTop, interpolatedBottom));
      prevD = newD;
    }
  }

  //display function for stationary ball generation
  display(){  
    push()

    translate(this.ballXPos, this.ballYPos)

    stroke(this.StrokeColor)
    strokeWeight(this.StrokeWeight)

    fill(this.colorTop)
    arc(0,0, this.ballDiameter, this.ballDiameter, PI/2, (3*PI)/2) //calculate semicircle shape

    fill(this.colorBottom)
    arc(0,0, this.ballDiameter, this.ballDiameter, (3*PI)/2, PI/2)

    pop()   
  }

  //display function for miclevel osciallation
  displayWithOscillation(micLevel){
    push()

    //calculate oscillation based on mic level input
    let oscillationX = sin(frameCount * 0.1 + this.originalX * 0.1) * micLevel * 20
    let oscillationY = cos(frameCount * 0.08 + this.originalY * 0.1) * micLevel * 15

    //Apply oscillation to current position
    let currentX = this.originalX + oscillationX
    let currentY = this.originalY + oscillationY

    //apply same display functions
    translate(currentX, currentY)

    stroke(this.StrokeColor)
    strokeWeight(this.StrokeWeight)

    fill(this.colorTop)
    arc(0,0, this.ballDiameter, this.ballDiameter, PI/2, (3*PI)/2, PI)

    fill(this.colorBottom)
    arc(0,0, this.ballDiameter, this.ballDiameter, (3*PI)/2, PI/2)

    pop()
  }

  //Display function for ball dropping for when ballsDropping == true
  displayDropping(){
    push()
    //apply gravity to the dropspeed
    this.dropSpeed += this.gravity

    if (this.ballYPos < this.targetY){
      this.ballYPos += this.dropSpeed
      //random horizontal movement for natural falling feel
      this.ballXPos += random(-10, 10)

      //slight bounce when hitting base level
      if (this.ballYPos >= this.targetY) {
        this.ballYPos = this.targetY
        this.dropSpeed *= -5
      }
    }

    //apply same display functions
    translate(this.ballXPos, this.ballYPos)
    stroke(this.StrokeColor)
    strokeWeight(this.StrokeWeight)

    fill(this.colorTop)
    arc(0,0, this.ballDiameter, this.ballDiameter, PI/2, (3*PI)/2, PI)

    fill(this.colorBottom)
    arc(0,0, this.ballDiameter, this.ballDiameter, (3*PI)/2, PI/2)

    pop()
  }

}
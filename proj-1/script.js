class Star {
    constructor(x, y, brightness, size) {
      this.x = random(windowWidth);
      this.y = random(windowHeight);
      this.size = size || 1; 
      this.twinkleSpeed = random(1, 5); 
      this.brightness = brightness || 255; 

      //console.log('Random X:', this.x);
      //console.log('Random Y:', this.y);
    }

    
  
    twinkle() {
      this.size = this.size + random(-0.5, 0.5); 
      if (this.size < this.defaultSize - 1 || this.size > this.defaultSize + 1) {
        this.size = this.defaultSize;
      }
    }
  
    display() {
        //console.log(`Star at (${this.x}, ${this.y}), size: ${this.size}, brightness: ${this.brightness}`);
        noStroke();
        fill(255, 255, 255, this.brightness);
        ellipse(this.x, this.y, this.size, this.size);
      }
  }
  
  let stars = []; 
  let starData; 
  const numberOfRecords = 999;
  
  function preload() {
    starData = loadJSON('https://data.cityofnewyork.us/resource/7479-ugqb.json', setupStars);
  }
  
  function setupStars(data) {
    starData = data; 
    //console.log('Number of records in starData:', starData.length); 

    for (let i = 0; i < starData.length; i++) {
      let data = starData[i];
      let admittedTimestamp = Date.parse(data.admitted_dt);
      let currentTimestamp = Date.now();
      let timeDifference = currentTimestamp - admittedTimestamp;
  
      let brightness = map(timeDifference, 100000000000, 0, 255, 10);
  
      let size = 1; 
      if (data.custody_level === 'MIN') {
        size = 3; // BIGGER star for minimum sentence 
      } else if (data.custody_level === 'MED') {
        size = 1.5; // medium
      } else if (data.custody_level === 'MAX') {
        size = 1; // SMALLER star for max sentnece 
      }
  
      stars.push(new Star(random(width), random(height), brightness, size));
    }
  }
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    background(0); 
    for (let star of stars) {
      star.twinkle();
      star.display();
    }
  }
  


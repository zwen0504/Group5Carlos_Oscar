# Animated Mosaic Tree: User-Input Submission
**Oscar Wen | zwen0504 | Carlos Group 6**

## Overview
This project transforms Anwar Jalal Shemza's "Apple Tree" into an interactive digital artwork utilising user input to drive animation. The piece generates a mosaic-style background extracted from the original painting and overlays generated tree shape utilising keyboard and audio input.

## Instructions
### Setup
1. **Enable Microphone Access**: Ensure microphone access is enabled when the browser prompts 
2. **Wait for Loading**: Allow the image to load completely before interaction begins.

### Interaction Controls
- **Speak or Make Sounds**: 
  - **Gentle sounds**: Watch the tree branches sway and oscillate in response to your voice or ambient noise
  - **Loud sounds**: When volume exceeds the threshold, all branch elements will fall to the base level like autumn leaves
- **Wait and Watch**: After the falling animation completes (approx 3 seconds), the tree will automatically regenerate
- **Press 'C' Key**: Toggle between regular seasonal tree colors and cherry blossom mode (pink flowers)

## Individual Approach to Animation

### Animation Driver: Audio Input
I chose **audio input** as the primary driver for my animation system. This decision was inspired by the organic, living quality I wanted to bring to the static artwork - making it respond to the viewer's presence and voice creates an intimate, interactive experience.

### Animated Properties
My implementation focuses on animating **position and movement** of the tree elements:

1. **Branch Oscillation**: 
   - Tree branches sway in real time based on microphone input volume
   - Movement uses sine and cosine waves with mic level controlling amplitude
   - Each branch segment moves with slight variations for natural and organic motion

2. **Falling Animation**:
   - When an audio threshold is exceeded, the branch elements fall
   - Falling simulates gravity with random x movement for realism
   - Only branch elements fall while trunk remains still

3. **Color Mode Switching**:
   - Transition between seasonal colors and cherry blossom mode
   - Complete scene regeneration ensures clean visual transitions

### Inspiration and References

#### Visual Inspiration
My animation approach was inspired by several sources:

1. **Natural Tree Movement**: Observed how real trees respond to wind, gentle swaying in light breezes, dramatic movement in storms
![autumn-leaves](Assets\autumn.jpg)
2. **Japanese Cherry Blossom Falling**: The traditional imagery of sakura petals falling, which influenced the dramatic dropping animation
![cherry-blossoms](Assets\cherry.webp)
3. **Interactive Sound Visualisations**: Works like Casey Reas' generative art pieces that respond to audio input
4. **Anwar Jalal Shemza's Geometric Style**: Maintained the mosaic, geometric aesthetic while adding organic movement

#### Technical Inspiration
- **Processing/p5.js Audio Examples**: Studied oscilloscope style visualisations for implementing smooth audio responsiveness
- **Physics Simulations**: Gravity based particle systems for realistic falling animations
- **Generative Art Techniques**: Procedural tree generation algorithms for creating organic, branching structures


## Technical Implementation

### Animation System

#### Audio
```javascript
// Microphone setup and real time level detection
mic = new p5.AudioIn();
micLevel = mic.getLevel(); // Returns 0.0 to 1.0
```

The system continuously monitors microphone input and maps volume levels to visual parameters:
- **Low levels (0.0-0.35)**: Subtle branch oscillation
- **High levels (>0.35)**: Triggers falling animation

#### Oscillation formula
```javascript
let oscillationX = sin(frameCount * 0.1 + this.originalX * 0.1) * micLevel * 20;
let oscillationY = cos(frameCount * 0.08 + this.originalY * 0.1) * micLevel * 15;
```

This creates natural looking branch movement by:
- Using time-based sine/cosine waves for smooth motion
- Incorporating each ball's position for variation across branches
- Scaling movement amplitude by microphone input level

#### Physics Based Falling System
The falling animation implements realistic physics:
- **Gravity**: Constant downward acceleration
- **Bounce**: Reduced velocity reversal when hitting ground
- **Drift**: Slight horizontal randomisation for natural falling patterns

### Major Code Modifications

#### Enhanced Ball Class
Extended the original `Circles` class with three display modes:
1. `display()`: Static positioning
2. `displayWithOscillation()`: Audio responsive swaying
3. `displayDropping()`: Physics based falling animation

#### Canvas Management System
Implemented canvas clearing:
- **Normal mode**: Static drawing for performance
- **Dropping mode**: Full background redraw each frame for clean animation trails
- **Regeneration**: Complete scene recreation after animations complete

## File Structure
- `sketch.js`: Main animation logic, audio processing, and canvas management
- `branches.js`: Enhanced Circles class with animation methods
- `trunk_base.js`: Static decorative elements (unchanged from group version)
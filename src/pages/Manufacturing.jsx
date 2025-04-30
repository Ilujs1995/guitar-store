import React from 'react';
import './Manufacturing.css';
import bentSidesImage from '/src/assets/images/manufacturing-bent-the-sides.jpg';
import neckWarpingImage from '/src/assets/images/manufacturing-tweak-warping-neck.jpg';
import gluingBodyImage from '/src/assets/images/manufacturing-glue-body-parts.jpg';
import dovetailJointImage from '/src/assets/images/manufacturing-dovetail-method.png';

export default function Manufacturing() {
  return (
    <div className="manufacturing-container">
      <h2>Steps of Making a Great Guitar</h2>

      <div className="steps-container">
        <div className="step-card">
          <div className="image-container">
            <img
              src={bentSidesImage}
              alt="Bent the sides"
              className="step-image"
            />
          </div>
          <h2 className="step-title">Bent the sides</h2>
          <div className="step-content">
            <p className="step-description">
              The sides are soaked in warm water, heated, and bent into smooth curves. They are placed in a frame, reinforced with blocks at key joints, and left to harden. Light, notched angle blocks are also attached to ensure the top and back fit securely.
            </p>
          </div>
          <div className="divider"></div>
        </div>

        <div className="step-card">
          <div className="image-container">
            <img
              src={neckWarpingImage}
              alt="Tweak the warping of the neck"
              className="step-image"
            />
          </div>
          <h2 className="step-title">Tweak the warping of the neck</h2>
          <div className="step-content">
            <p className="step-description">
              Blocks help firmly connect the guitar body and neck. A groove is carved into the top of the block to hold an iron rod, which supports the neck and prevents warping. A hexagon nut at the end of the rod allows adjustments: tightening the nut corrects a concave bow in the neck.
            </p>
          </div>
          <div className="divider"></div>
        </div>

        <div className="step-card">
          <div className="image-container">
            <img
              src={gluingBodyImage}
              alt="Glue the top, back, sides"
              className="step-image"
            />
          </div>
          <h2 className="step-title">Glue the top, back, sides</h2>
          <div className="step-content">
            <p className="step-description">
              After treatment, the top, back, and sides are placed in a frame and glued together at once. The frame is tightened around the body, and the glue is left to harden for 90 to 120 minutes.
            </p>
          </div>
          <div className="divider"></div>
        </div>

        <div className="step-card">
          <div className="image-container">
            <img
              src={dovetailJointImage}
              alt="Dovetail method"
              className="step-image"
            />
          </div>
          <h2 className="step-title">Dovetail method</h2>
          <div className="step-content">
            <p className="step-description">
              The body and neck are connected using a dovetail joint, where a trapezoidal extension from the neck fits tightly into a matching hole in the body. This strong, nail-free connection ensures good sound transmission and is named for its resemblance to a dove's tail.
            </p>
          </div>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
}
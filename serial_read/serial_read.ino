#include <Servo.h> 
Servo myservo1;
Servo myservo2;

int mVal; //store mapped value for servo

int sensor = 0;//storing the incoming value

int arraysize = 5; //Sample size. Needs to be an odd number
int rangevalue[] = {0, 0, 0, 0, 0}; //0s are place holders for ease of reading code


int sensorValue;
char piState;

boolean servoOpen = false;


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  pinMode(13, OUTPUT);//red error light pin
  pinMode(12, OUTPUT);//blue light pin
  myservo1.attach(9);
  myservo2.attach(11);
  delay(500);//want to get the serial up and running before beginning the data

}


void loop() {
  digitalWrite(13, LOW);//error light off
  digitalWrite(12, HIGH);//blue light on
  
  //check the incoming state to know if the motors should be on or off
  if (Serial.available() > 0) {
  char incoming = Serial.read();
    if (incoming =='A'){
       piState = Serial.read();
       
       if (piState == 'A'){
        //is it still A? do nothing- keep reading
        }else if(piState == 'O'){
          servorOpen == true;
          }else if (piState == 'X'){
            servoOpen == false;
            } else{
              Serial.println("Read Failed");
              digitalWrite(13, HIGH)
              }
      }
      delay(100);
  }
   for(int i = 0; i < arraysize; i++)
  {                                                
    rangevalue[i] = analogRead(anPin);
    delay(10);  //wait between samples
   }  
   
   int midpoint = arraysize/2;    //midpoint of the array is the medain value in a sorted array
    //Serial.print("The median range value is: ");
    Serial.println(rangevalue[midpoint]);

    
//mapping midpoint sensor val to servo if not open
    if (rangevalue[midpoint]<=200 && servoOpen == false){
     mVal = map(rangevalue[midpoint], 200, 12, 50, 130);        
     myservo1.write(mVal); 
     myservo2.write(mVal);        
     delay(15);
     //Serial.println("moving servo to: "); 
     //Serial.print(mVal);
     //Serial.println("degrees");
     
    }else if(rangevalue[midpoint]<=200 && servoOpen == true){
     myservo1.write(50); 
     myservo2.write(50);        
     delay(15);
     
    }else{
      //No one is close enough to register
      myservo1.write(50); 
      myservo2.write(50);
      delay(15);
      }
      
  delay(100);
}




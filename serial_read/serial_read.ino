int sensorValue[1];

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}


void loop() {
  sensorValue[1] = analogRead(0);
  Serial.println (sensorValue[1]);
  delay(100);
}




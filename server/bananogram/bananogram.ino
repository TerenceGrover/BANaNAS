#include <WiFi.h>
#include "ESPAsyncWebServer.h"
#include <ESPmDNS.h>
#include "HD44780_LCD_PCF8574.h"
#include <string.h>

const char* ssid = "Codeworks";
const char* pwd = "codinginthesun";

AsyncWebServer server(80);
HD44780LCD lcd(2, 16, 0x27);
bool work = false;

char metricOne[128];
char metricTwo[128];
char placeOne[128];
char placeTwo[128];
char rIndex[6];
char str[16];

void setup() {
  /* Setup for ESP32 */
  pinMode(2, OUTPUT);
  Serial.begin(115200);

  /* Setup for display */
  lcd.PCF8574_LCDInit(LCDCursorTypeOff);
  lcd.PCF8574_LCDClearScreen();
  lcd.PCF8574_LCDBackLightSet(true);


  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pwd);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("IP Adress: ");
  Serial.println(WiFi.localIP());
  if (MDNS.begin("bananogram")) {
    Serial.println(" Reachable at: http://bananogram.local/");
  }

  // string r;

  server.on("/on", HTTP_GET, [](AsyncWebServerRequest* request) {
    work = false;

    lcd.PCF8574_LCDClearScreen();

    int params = request->params();
    // params will be metric, r
    if (request->hasParam("metricOne")) {
      AsyncWebParameter* p = request->getParam("metricOne");
      sprintf(metricOne, "%s", p->value().c_str());
    }
    if (request->hasParam("metricTwo")) {
      AsyncWebParameter* p = request->getParam("metricTwo");
      sprintf(metricTwo, "%s", p->value().c_str());
    }
    if (request->hasParam("placeOne")) {
      AsyncWebParameter* p = request->getParam("placeOne");
      sprintf(placeOne, "%s", p->value().c_str());
    }
    if (request->hasParam("placeTwo")) {
      AsyncWebParameter* p = request->getParam("placeTwo");
      sprintf(placeTwo, "%s", p->value().c_str());
    }
    if (request->hasParam("r")) {
      AsyncWebParameter* p = request->getParam("r");
      sprintf(rIndex, "%s", p->value().c_str());
    }
    sprintf(str, "R index: %s", rIndex);
    Serial.print(strlen(metricOne));
    request->send(200, "text/plain", "OK");
    work = true;
  });
  server.begin();
}

void loop() {
  if (work) {
    delay(5);
    lcd.PCF8574_LCDClearLine(LCDLineNumberOne);
    lcd.PCF8574_LCDClearLine(LCDLineNumberTwo);
    lcd.PCF8574_LCDHome();
    delay(5);
    lcd.PCF8574_LCDGOTO(LCDLineNumberOne, 0);
    lcd.PCF8574_LCDSendString(metricOne);
    lcd.PCF8574_LCDGOTO(LCDLineNumberTwo, 0);
    lcd.PCF8574_LCDSendString(placeOne);
    if (strlen(metricOne) > 16) {
      delay(400);
      for (int i = 1; i < 11; i += 1) {
        lcd.PCF8574_LCDScroll(LCDMoveLeft, 1);
        lcd.PCF8574_LCDGOTO(LCDLineNumberTwo, i);
        lcd.PCF8574_LCDSendString(placeOne);
        delay(300);
      }
    } else delay(3000);
    delay(5);
    lcd.PCF8574_LCDClearLine(LCDLineNumberOne);
    lcd.PCF8574_LCDClearLine(LCDLineNumberTwo);
    lcd.PCF8574_LCDHome();
    delay(5);
    lcd.PCF8574_LCDGOTO(LCDLineNumberOne, 0);
    lcd.PCF8574_LCDSendString(metricTwo);
    lcd.PCF8574_LCDGOTO(LCDLineNumberTwo, 0);
    lcd.PCF8574_LCDSendString(placeTwo);
    if (strlen(metricTwo) > 16) {
      delay(400);
      for (int i = 1; i < 11; i += 1) {
        lcd.PCF8574_LCDScroll(LCDMoveLeft, 1);
        lcd.PCF8574_LCDGOTO(LCDLineNumberTwo, i);
        lcd.PCF8574_LCDSendString(placeTwo);
        delay(300);
      }
    } else delay(3000);
    delay(5);
    lcd.PCF8574_LCDClearLine(LCDLineNumberOne);
    lcd.PCF8574_LCDClearLine(LCDLineNumberTwo);
    lcd.PCF8574_LCDHome();
    delay(5);
    lcd.PCF8574_LCDGOTO(LCDLineNumberOne, 0);
    lcd.PCF8574_LCDSendString(str);
    delay(3000);
  }
}
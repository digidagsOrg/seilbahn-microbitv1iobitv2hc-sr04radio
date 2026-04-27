let distance = 0
let angekommen = 0
radio.setGroup(11)
basic.forever(function () {
    basic.pause(500)
    // P0 = Trigger
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(4)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    // P1 = Echo
    distance = 34 * (pins.pulseIn(DigitalPin.P1, PulseValue.High) / 2000)
    serial.writeValue("distance", distance)
    if (distance <= 5 && angekommen == 0) {
        angekommen = 1
        basic.showNumber(1)
        // Seilbahn ist da
        radio.sendNumber(1)
    } else {
        angekommen = 0
        basic.showNumber(0)
    }
})

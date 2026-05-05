function setDistance () {
    // P0 = Trigger
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(4)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    // P1 = Echo
    read_distance = 34 * (pins.pulseIn(DigitalPin.P1, PulseValue.High) / 2000)
    read_distance = Math.round(read_distance)
    return read_distance
}
let distance = 0
let read_distance = 0
let arrived = 0
radio.setGroup(11)
basic.forever(function () {
    basic.pause(500)
    distance = setDistance()
    serial.writeValue("distance", distance)
    if (distance <= 5 && arrived == 0) {
        arrived = 1
        basic.showNumber(1)
        // Seilbahn ist da
        radio.sendNumber(1)
    } else {
        arrived = 0
        basic.showNumber(0)
    }
})

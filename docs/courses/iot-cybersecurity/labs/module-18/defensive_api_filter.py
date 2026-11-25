#!/usr/bin/env python3
# CyberTube Module 18: Defensive API Input Sanitizer & IDOR Validator

import re
import sys

ALLOWED_PINS = {2, 4, 21, 22, 25}
ALLOWED_STATES = {"0", "1"}

def sanitize_actuator_request(pin_param, state_param, authenticated_user_id, target_device_id):
    # 1. Access control / IDOR check
    if authenticated_user_id != target_device_id:
        return False, "403 Forbidden: Cross-tenant device access rejected"
        
    # 2. Pin whitelisting
    try:
        pin = int(pin_param)
        if pin not in ALLOWED_PINS:
            return False, f"400 Bad Request: Pin {pin} is not an authorized GPIO actuator"
    except ValueError:
        return False, "400 Bad Request: Invalid pin identifier"
        
    # 3. State validation
    if str(state_param) not in ALLOWED_STATES:
        return False, "400 Bad Request: State must be 0 or 1"
        
    return True, f"200 OK: Set GPIO {pin} to {state_param}"

if __name__ == '__main__':
    print("Testing defensive input sanitizer:")
    print(sanitize_actuator_request("2", "1", "user_101", "user_101"))
    print(sanitize_actuator_request("99", "1", "user_101", "user_101"))
    print(sanitize_actuator_request("2", "1", "user_101", "user_999"))

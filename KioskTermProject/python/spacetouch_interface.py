import cv2
import mediapipe as mp  # pip3 install mediapip-rpi4
import pyautogui  # pip3 install pyautogui
import time
CLICK_THRESH = 0.1
MpHands = mp.solutions.hands
hands = MpHands.Hands()
cap = cv2.VideoCapture(0)
p_time, c_time = 0, 0
pyautogui.PAUSE = 0
screen_size = pyautogui.size()
last_click = False
while True:
    success, frame = cap.read()
    if not success:
        print('Waiting for Frame...')
        continue
    frame = cv2.flip(frame, 1)
    height, width, _ = frame.shape
    hand_ret = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if hand_ret.multi_hand_landmarks:
        hand_landmarks = hand_ret.multi_hand_landmarks[0]
        points = []
        for idx in [MpHands.HandLandmark.INDEX_FINGER_TIP,
                    MpHands.HandLandmark.INDEX_FINGER_MCP,
                    MpHands.HandLandmark.THUMB_TIP]:
            p_x, p_y = hand_landmarks.landmark[idx].x * width, hand_landmarks.landmark[idx].y * height
            cv2.circle(frame, (int(p_x), int(p_y)), 10, (0, 255, 0), cv2.FILLED)
            points.append((p_x, p_y))
        cv2.drawMarker(frame, (int(points[0][0]), int(points[0][1])),
                       (0, 0, 255), cv2.MARKER_TRIANGLE_UP, 20, 3)
        norm_1 = (points[0][0] - points[1][0]) ** 2 + (points[0][1] - points[1][1]) ** 2
        norm_2 = (points[1][0] - points[2][0]) ** 2 + (points[1][1] - points[2][1]) ** 2
        cv2.putText(frame, 'Pos: %d %d' % (points[0][0], points[0][1]), (10, 70),
                    cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 1)
        mouse_x = int(points[0][0] / width * screen_size.width)
        mouse_y = int(points[0][1] / height * screen_size.height)
        pyautogui.moveTo(mouse_x, mouse_y)
        if norm_2 / norm_1 < CLICK_THRESH:
            cv2.putText(frame, 'Clicked', (10, 30),
                        cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 1)
            if not last_click:
                last_click = True
                pyautogui.click()
        else:
            last_click = not last_click
    c_time = time.time()
    fps = 1 / (c_time - p_time)
    p_time = c_time
    cv2.putText(frame, 'FPS: %d' % fps, (10, 110), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 1)
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) == ord('q'):
        break
cap.release()
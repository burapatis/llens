import assert from "node:assert/strict";
import test from "node:test";
import { buildHomeCoachResult } from "../app/_lib/homeCoach.ts";

test("home coach adapts its plan to different learner situations", () => {
  const situations = [
    "เด็กไม่ยอมเริ่มงานและวอกแวกบ่อย แต่ตอบปากเปล่าได้ดี",
    "นักเรียนถูกเพื่อนล้อซ้ำและไม่อยากมาโรงเรียน",
    "เด็กเล่นเกมดึก ง่วงในห้องและไม่ส่งงาน",
    "เด็กอ่านช้าแต่ชอบวาดรูปและตอบปากเปล่าได้ดี",
    "นักเรียนสนใจเรื่องอวกาศมาก แต่ไม่ค่อยร่วมกิจกรรมกลุ่มและเปลี่ยนกิจกรรมได้ยาก",
  ];
  const results = situations.map(buildHomeCoachResult);

  assert.equal(new Set(results.map(({ title }) => title)).size, situations.length);
  results.forEach((result, index) => {
    assert.match(result.context, new RegExp(situations[index].slice(0, 18)));
    assert.ok(result.actions.length >= 3);
    assert.ok(result.question.length > 20);
    assert.equal(result.urgent, false);
  });
});

test("home coach prioritizes safety when risk language appears", () => {
  const result = buildHomeCoachResult("เด็กบอกว่าไม่อยากอยู่และคิดจะทำร้ายตัวเอง");

  assert.equal(result.urgent, true);
  assert.match(result.title, /ความปลอดภัย/);
  assert.match(result.actions.join(" "), /191/);
  assert.match(result.actions.join(" "), /1300/);
  assert.match(result.actions.join(" "), /1323/);
});

package com.myweb.www.handler;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.myweb.www.domain.RoomVO;
import com.myweb.www.domain.ScheduleVO;
import com.myweb.www.domain.SearchDTO;
import com.myweb.www.repository.RoomDAO;
import com.myweb.www.repository.ScheduleDAO;
import com.myweb.www.repository.SeatDAO;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@AllArgsConstructor
public class ScheduleHandler {
	
	@Inject
	private RoomDAO rdao;
	
	@Inject
	private SeatDAO sdao;
	
	@Inject
	private ScheduleDAO scdao;
	
	@Scheduled(cron = "00 15 00 * * *")
	public void scheduleGenerate() {
		log.info("SchduleHandler >>> scheduleGenerate");
		LocalDateTime today = LocalDateTime.now().with(LocalTime.NOON).minusHours(4).plusDays(6);
		List<RoomVO> rvoList = rdao.selectListAll();
		for (RoomVO rvo : rvoList) {
			if (random(0, 1) > 0) {
				int plusHour = 0;
				int len = random(3,7);
				for (int j = 0; j < len; j++) {
					if (random(0,1) > 0) {
						ScheduleVO scvo = new ScheduleVO();
						scvo.setRno(rvo.getRno());
						scvo.setTno(rvo.getTno());
						scvo.setMovieId(rvo.getMovieId());
						scvo.setStartTime(today.plusHours(plusHour).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
						scvo.setEndTime(today.plusHours(plusHour).plusHours(2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
						scdao.insert(scvo);
					}
					plusHour += 2;
				}
			}
		}		
	}
	
	@Scheduled(cron = "00 30 00 * * *")
	public void autoSeatRegister() {
		log.info("SchduleHandler >>> autoSeatRegister");
		List<ScheduleVO> scvoList = scdao.selectListAll();
		for (ScheduleVO scvo : scvoList) {
			if (sdao.selectSeatCount(scvo.getScno()) < 1) {
				int cnt = 0;
				RoomVO rvo = rdao.selectOneFromRno(scvo.getRno());
				int width = rvo.getWidth();
				int height = rvo.getHeight();
				width = width - (rvo.getPathX1() > 0 ? 1 : 0) - (rvo.getPathX2() > 0 ? 1 : 0);
				height = height - (rvo.getPathY1() > 0 ? 1 : 0) - (rvo.getPathY2() > 0 ? 1 : 0);
				for(int y = 65; y < 65 + height; y++) {
					for (int x = 1; x <= width; x++) {
						SearchDTO schdto = new SearchDTO();
						schdto.setScno(scvo.getScno());
						schdto.setX(x);
						schdto.setY(String.valueOf((char)y));
						schdto.setValid(x % 2 == 1 ? false : true);
						sdao.insertSeat(schdto);
						cnt++;
					}
				}
				ScheduleVO newScvo = new ScheduleVO();
				newScvo.setScno(scvo.getScno());
				newScvo.setTotalSeat(cnt);
				newScvo.setEmptySeat(cnt);
				scdao.updateSeat(newScvo);
			}
		}
	}
	
	@Scheduled(cron = "00 05 00 * * *")
	public void scheduleRemover() {
		log.info("SchduleHandler >>> ScheduleRemover");
		List<ScheduleVO> scvoList = scdao.selectOldSchedule();
		for (ScheduleVO scvo : scvoList) {
			scdao.deleteFromScno(scvo.getScno());
			sdao.deleteAllFromScno(scvo.getScno());
		}
	}
	
	private static int random(int min, int max) {
		return (int)Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
}

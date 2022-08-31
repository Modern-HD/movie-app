package com.myweb.www.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myweb.www.domain.BSeatVO;
import com.myweb.www.domain.BookVO;
import com.myweb.www.domain.DateDTO;
import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MovieVO;
import com.myweb.www.domain.PayDTO;
import com.myweb.www.domain.RoomDTO;
import com.myweb.www.domain.RoomVO;
import com.myweb.www.domain.ScheduleDTO;
import com.myweb.www.domain.ScheduleVO;
import com.myweb.www.domain.SearchDTO;
import com.myweb.www.domain.SeatVO;
import com.myweb.www.domain.SeatingDTO;
import com.myweb.www.domain.TheaterVO;
import com.myweb.www.domain.TicketDTO;
import com.myweb.www.repository.BSeatDAO;
import com.myweb.www.repository.BookDAO;
import com.myweb.www.repository.FavorThDAO;
import com.myweb.www.repository.MovieDAO;
import com.myweb.www.repository.RoomDAO;
import com.myweb.www.repository.ScheduleDAO;
import com.myweb.www.repository.SeatDAO;
import com.myweb.www.repository.TheaterDAO;

@Service
public class BookServiceImpl implements BookService {

	@Inject
	private RoomDAO rdao;
	
	@Inject
	private MovieDAO modao;
	
	@Inject 
	private ScheduleDAO scdao;
	
	@Inject
	private SeatDAO sdao;
	
	@Inject
	private TheaterDAO tdao;
	
	@Inject
	private FavorThDAO fdao;
	
	@Inject
	private BookDAO bdao;
	
	@Inject
	private BSeatDAO bsdao;
	
	@Override
	public List<DateDTO> getDateList(long tno, Long movieId) {
		List<DateDTO> dateDTOList = new ArrayList<>();
		LocalDate now = LocalDate.now();
	 	for (int i = 0; i < 7; i++) {
	 		LocalDate dateObj = now;
	 		if (i > 0) {
				dateObj = dateObj.plusDays(i);
			}
	 		String date = dateObj.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	 		List<TicketDTO> tdtoList = new ArrayList<>();
	 		SearchDTO movoSchDto = new SearchDTO();
			movoSchDto.setTno(tno);
			movoSchDto.setDate(date);
			if (movieId != null) {
				movoSchDto.setMovieId(movieId);
			}
			List<MovieVO> movoList = modao.selectTicketList(movoSchDto);
			for (MovieVO movo : movoList) {
				List<RoomDTO> rdtoList = new ArrayList<>();
				List<RoomVO> rvoList = rdao.selectTicketList(tno);
				for (RoomVO rvo : rvoList) {
					List<ScheduleDTO> scdtoList = new ArrayList<>();
					SearchDTO scSchDto = new SearchDTO();
					scSchDto.setRno(rvo.getRno());
					scSchDto.setMovieId(movo.getMovieId());
					scSchDto.setDate(date);
					List<ScheduleVO> scvoList = scdao.selectList(scSchDto);
					for (ScheduleVO scvo : scvoList) {
						scdtoList.add(new ScheduleDTO(scvo, sdao.selectSeatCount(scvo.getScno()), sdao.selectEmptyCount(scvo.getScno())));
					}
					if (scdtoList.size() > 0) {
					rdtoList.add(new RoomDTO(rvo, scdtoList));
					}
				}
				if (rdtoList.size() > 0) {
				tdtoList.add(new TicketDTO(movo, rdtoList));
				}
			}
			dateDTOList.add(new DateDTO(date, tdtoList));
		}
		return dateDTOList;
	}

	@Override
	public SeatingDTO getSeatList(long scno) {
		ScheduleDTO scdto = new ScheduleDTO(scdao.selectOneFromScno(scno), sdao.selectSeatCount(scno), sdao.selectEmptyCount(scno));
		RoomVO rvo = rdao.selectOneFromRno(scdto.getScvo().getRno());
		SeatingDTO sdto = new SeatingDTO(modao.selectOneFromMovieId(scdto.getScvo().getMovieId()),
				tdao.selectOneFromTno(scdto.getScvo().getTno()),
				rvo,
				scdto, 
				sdao.selectListFromScno(scno));
		return sdto;
	}

	@Override
	public List<TheaterVO> getTheaterList(Long movieId) {
		return tdao.selectList(movieId);
	}

	@Override
	public List<MovieVO> getMovieList() {
		return modao.selectMovieList();
	}

	@Override
	public List<TheaterVO> getSpecialList(Long movieId) {
		return tdao.selectSpecialList(movieId);
	}

	@Override
	public List<TheaterVO> getTheaterListAll() {
		return tdao.selectListAll();
	}

	@Override
	@Transactional
	public String register(PayDTO pydto, List<String> sidList) {
		int bookCnt = bdao.selectBnoCount();
		String bno = String.valueOf(pydto.getMno()) + "B" + String.valueOf(bookCnt + 1);
		BookVO bvo = new BookVO(bno, pydto.getScno(), pydto.getMno(), pydto.getMovieId(), pydto.getPay(), 
				pydto.getAdult(), pydto.getTeenager(), pydto.getElder());
		int isUp = 1;
		for (String sid : sidList) {
			isUp *= sdao.updateStatusToTrue(new SeatVO(sid, pydto.getScno()));
			if (isUp > 0) {
				isUp *= bsdao.insertBSeat(new BSeatVO(sid, bno));
			}
		}
		if (isUp > 0) {
			isUp *= modao.updateTicket(bvo);
			isUp *= bdao.insertBook(bvo);
		}
		return isUp > 0 ? bno : null;
	}

	@Override
	public PayDTO getPydto(long scno) {
		ScheduleVO scvo = scdao.selectOneFromScno(scno);
		PayDTO pydto = new PayDTO(scvo, tdao.selectOne(scvo.getTno()), rdao.selectOneFromRno(scvo.getRno()), modao.selectOneFromMovieId(scvo.getMovieId()));
		return pydto;
	}

	@Override
	public List<FavorThVO> getMyTheaterList(long mno) {
		return fdao.selectOne(mno);
	}

}

import { Button, HStack, Text, VStack, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Appbar from "../Appbar";
import { ListItem, UnorderedList, } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Input,InputLeftAddon, InputGroup } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useEffect,useState,useRef } from "react";
import { saveAs } from 'file-saver';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useNavigate } from "react-router";
import { studentApplyStore } from "../../dataflow/store";
import { studentStore } from "../../dataflow/store/studentApply/StudentStore";
import { APPLY_FIELD } from "../../dataflow/store/studentApply/StudentApplyStore";
import { IApplicationForm } from "../../dataflow/interface/counseling"

const StudentApplyPage = observer(() => {
  const day=['일','월','화','수','목','금','토']

  const [type, setType] = useState('personal_1');
  const [fields, setFields] = useState<(string|number)[]>([]);
  // const [file, setFile] = useState<string|null>(); 
  // const [times, setTimes] = useState<(string|number)[]>([]);
  // const [testTime, setTestTime] = useState('10');
  // const [testYear, setTestYear] = useState('');
  // const [testMonth, setTestMonth] = useState('');
  // const [testDate, setTestDate] = useState('');
  // const [appliedAt, setAppliedAt] = useState<string>("");
  // const [expectedDate, setExpectedDate] = useState<Date>(new Date());
  
  useEffect(() => {
    studentStore.fetchApplication();
  }, []);

  useEffect(() => {
    if(studentStore.applicationExist){
      // setAppliedAt(studentStore.application.applied_at);
      setType(studentStore.application.counseling_type);
      setFields(studentStore.application.counseling_preferfields);
      console.log(studentStore.application.counseling_type);
      console.log(studentStore.application.counseling_preferfields)
      // setTimes(studentStore.application.counseling_prefertimeslots);
      // setFile(studentStore.application.application_file);
      // setTestTime(studentStore.application.test_timeslot);
      // let testdate=studentStore.application.test_date.split('-');
      // setTestYear(testdate[0]);
      // setTestMonth(testdate[1]);
      // setTestDate(testdate[2]);
      // getExpectedDate();
    }
  }, [studentStore.applicationExist]);


  // 상담 예정일 구하기
  // function isExpectedDay(date:Date) { // expected_date의 요일이 times에 있는지 확인하는 함수
  //   const dayIndex = date.getDay();
  //   const dayAbbreviation = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex];
  //   return times.some(time => typeof time === 'string' && time.includes(dayAbbreviation));
  // }
  // const getExpectedDate=()=>{
  //   let expected_date=new Date(appliedAt);
  //   expected_date.setDate(expected_date.getDate()+14);
  //   while (!isExpectedDay(expected_date)) {
  //     expected_date.setDate(expected_date.getDate() + 1);
  //   }
  //   setExpectedDate(expected_date);
  // }

  // // 신청서 양식 다운로드
  // const handleDownload = (path: string, saveName: string) => {
  //   // 파일을 읽어오는 동기 함수
  //   const loadFile = (url: string) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', url, false);
  //     xhr.send();
  //     return xhr.response;
  //   };

  //   // docx 파일 읽기
  //   const docxContent = loadFile(path);

  //   // Blob으로 변환
  //   const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  //   // 다운로드
  //   saveAs(blob, saveName);
  // };
  
const PageDescription = observer(() => {
  return (
    <VStack style={{ alignItems: "flex-start", width:"100%"}}>
      <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
        <Text fontSize="2xl" fontWeight="700">
          개인 상담 신청 내역 확인
        </Text>
        <Text fontSize="md">개인 상담 신청 내역을 확인합니다</Text>
      </HStack>
    </VStack>
    );
  });


  const CounselingType = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">상담 종류</Text>
        <RadioGroup id="counseling_type" style={{ margin: "1rem" }} onChange={setType} value={type}>
          <Stack>
            <Radio colorScheme='green' value='personal_1'>검사 해석 상담(검사 후 1회기 해석)</Radio>
            <Radio colorScheme='green' value='personal_5'>5회기 개인 상담</Radio>
            <Radio colorScheme='green' value='personal_10'>10회기 개인 상담</Radio>
          </Stack>
        </RadioGroup>
      </VStack>
    );
  });

  const CounselingField = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">상담 분야</Text>
        <CheckboxGroup colorScheme='green' onChange={setFields} value={fields}>
          <Stack spacing={[1, 5]} direction={['column', 'row']} style={{ margin: "1rem" }}>
            <Checkbox value='대인관계' disabled>대인관계</Checkbox>
            <Checkbox value='성격 및 적응' disabled>성격 및 적응</Checkbox>
            <Checkbox value='학업 및 진로' disabled>학업 및 진로</Checkbox>
            <Checkbox value='심리 및 정서' disabled>심리 및 정서</Checkbox>
            <Checkbox value='가족 관계' disabled>가족 관계</Checkbox>
            <Checkbox value='결혼 및 연애' disabled>결혼 및 연애</Checkbox>
            <Checkbox value='종교 및 가치관' disabled>종교 및 가치관</Checkbox>
          </Stack>
        </CheckboxGroup>
      </VStack>
    );
  });


  // const CounselingTime = observer(() => {
  //   return (
  //     <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
  //       <Text fontSize="xl" fontWeight="600">희망 상담 시간</Text>
  //       <CheckboxGroup colorScheme='green' onChange={setTimes} value={times}>
  //       <TableContainer style={{width:"100%"}}>
  //         <Table colorScheme="gray" style={{width:"60%",margin:"1rem"}} size='sm'>
  //           <Thead>
  //             <Tr style={{backgroundColor:"#D9D9D9"}}>
  //               <Th style={{width:"15%",textAlign: "center"}}>시간\요일</Th>
  //               <Th style={{textAlign: "center"}}>월</Th>
  //               <Th style={{textAlign: "center"}}>화</Th>
  //               <Th style={{textAlign: "center"}}>수</Th>
  //               <Th style={{textAlign: "center"}}>목</Th>
  //               <Th style={{textAlign: "center"}}>금</Th>
  //             </Tr>
  //           </Thead>
  //           <Tbody>
  //             {[10, 11, 13, 14, 15, 16].map((value, idx1) => {
  //             return <Tr>
  //                       <Td style={{backgroundColor:"#D9D9D9"}}>{value}:00~{value+1}:00</Td>
  //                       {['MON','TUE','WED','THU',"FRI"].map((day, idx2) =>{
  //                         let val=day+(idx1+1).toString();
  //                         return <Td style={{textAlign: "center"}}><Checkbox value={val} disabled/></Td>;
  //                       })}
  //                     </Tr>
  //             })}
  //           </Tbody>
  //         </Table>
  //       </TableContainer>
  //       </CheckboxGroup>
  //     </VStack>
  //   );
  // });

  // const FormUploader = observer(() => {
  //   return (
  //     <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
  //       <Text fontSize="xl" fontWeight="600">신청서</Text>
        
  //       <label htmlFor="application" style={{width:"90%", border: "solid 1px gray", borderRadius: "7px"}}>
  //         <InputGroup>
  //           <InputLeftAddon children='파일 찾기' />
  //           <Input type='text' disabled value={file?.name} />
  //         </InputGroup>
  //       </label>
  //       <input style={{opacity:0}} type="file" id="application" accept=".docx, .hwp"/>
  //     </VStack>
  //   );
  // });

  // const SelectSchedule = observer(() => {
  //   return (
  //     <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
  //       <Text fontSize="xl" fontWeight="600">희망 심리 검사 시간</Text>

  //       <HStack style={{ width:"100%", justifyContent:"space-between", alignItems:"flex-start", padding:"2rem"}}>
  //         <VStack>
  //           <Text fontSize="lg">
  //             {testYear}/{testMonth}/{testDate}({day[new Date(Number(testYear),Number(testMonth)-1,Number(testDate)).getDay()]})
  //           </Text>
  //           <RadioGroup defaultValue='10' style={{marginTop: "1rem"}} onChange={setTestTime} value={testTime}>
  //             <Stack>
  //               <Radio colorScheme='green' value='10' disabled>10시</Radio>
  //               <Radio colorScheme='green' value='11' disabled>11시</Radio>
  //               <Radio colorScheme='green' value='12' disabled>12시</Radio>
  //               <Radio colorScheme='green' value='13' disabled>13시</Radio>
  //               <Radio colorScheme='green' value='14' disabled>14시</Radio>
  //               <Radio colorScheme='green' value='15' disabled>15시</Radio>
  //               <Radio colorScheme='green' value='16' disabled>16시</Radio>
  //             </Stack>
  //           </RadioGroup>
  //         </VStack>
  //       </HStack>
  //     </VStack>
  //   );
  // });

  return (
    <VStack style={{width: "100%", paddingBottom:"10rem"}}>
      <Appbar/>

      <VStack style={{ width: "75%"}}>
        <PageDescription/>
        {/* <Text fontSize="xl" fontWeight="600">
          신청일: {appliedAt}<br/>
          상담 예정일: {expectedDate?.getFullYear()}년 {expectedDate?.getMonth()+1}월 {expectedDate?.getDate()}일 ({day[expectedDate.getDay()]})<br/>
        </Text> */}
        <CounselingType/>
        <CounselingField/>
        {/* <CounselingTime/> */}
        {/* <FormUploader/> */}
        {/* <SelectSchedule/>        */}
      </VStack>
    </VStack>
  );
});

export default StudentApplyPage;

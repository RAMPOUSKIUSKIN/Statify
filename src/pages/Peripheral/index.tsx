import { useState, useRef, useEffect, type RefObject } from 'react';
import InfoCard from "../../components/InfoCard";
import TitleBar from "../../components/TitleBar";
import { TestContainer } from "./styles";
import { FaRegKeyboard, FaMouse } from "react-icons/fa";


import { PageContainer } from "./styles";


function useKeyCapture(
	initialText = '',
	buttonRef?: RefObject<HTMLElement | null>
  ) {
	const [isListening, setIsListening] = useState(false);
	const [capturedKey, setCapturedKey] = useState<string | null>(null);
  
	useEffect(() => {
	  if (!isListening) return;
  
	  const handleKeyDown = (event: KeyboardEvent) => {
		event.preventDefault();
		const keyName = event.key === ' ' ? 'Espaço' : event.key;
		setCapturedKey(keyName);
	  };
  
	  const handleClickOutside = (event: MouseEvent) => {
		if (buttonRef?.current && !buttonRef.current.contains(event.target as Node)) {
		  setIsListening(false);
		  setCapturedKey(null);
		}
	  };
  
	  window.addEventListener('keydown', handleKeyDown);
	  window.addEventListener('mousedown', handleClickOutside);
  
	  return () => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('mousedown', handleClickOutside);
	  };
	}, [isListening, buttonRef]);
  
	const startListening = () => {
	  setCapturedKey(null);
	  setIsListening(true);
	};
  
	const buttonText = !isListening ? initialText : (capturedKey ?? '');
  
	return { buttonText, isListening, startListening };
  }


export function Peripheral() {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { buttonText, isListening, startListening } = useKeyCapture('Testar Teclado', buttonRef);

	return (
		<PageContainer>
			<TitleBar diagnosis={100} subtitle="DISPOSITIVOS CONECTADOS" title="Informações do Periféricos"/>
				<div className="infoCardContainer">
					<InfoCard Icon={FaRegKeyboard} title="Teste de Teclado">
						<TestContainer>
							<span>
								<div className="TestContainer">
									<button
										ref={buttonRef}
										type="button"
										className={isListening ? 'TestButtonActive' : 'TestButton'}
										onClick={startListening}
									  >
										{buttonText}
									</button>
								</div>
							</span>	
						</TestContainer>
					</InfoCard>
					<InfoCard Icon={FaMouse} title="Teste de Mouse">
						<TestContainer>
							<span>
								<h5>Testar Teclado</h5>
							</span>	
						</TestContainer>
					</InfoCard>
				</div>
		</PageContainer>
		
		
	)
}